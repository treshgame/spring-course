package dev.course.restcontrollers;

import dev.course.controllers.MedicationController;
import dev.course.entity.Medication;
import dev.course.entity.Operation;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.SupplierRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/medications")
@Hidden
public class MedicationRestController {
    @Autowired
    MedicationRepository medicationRepository;
    @Autowired
    SupplierRepository supplierRepository;
    @GetMapping("/get")
    private List<Medication> get(){
        return medicationRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Medication medication){
        try {
            Medication savedMedication = medicationRepository.save(medication);
            Map<String, Object> response = new HashMap<>();
            response.put("medication", savedMedication);
            response.put("suppliers", supplierRepository.findAll());
            return ResponseEntity.status(200).body(response);
        }catch (Exception ex){
            return ResponseEntity.status(400).body(ex.getCause());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            medicationRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Medication medication){
        if(medicationRepository.findById(medication.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Medication with such ID is not found");
        }

        try{
            medicationRepository.save(medication);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
