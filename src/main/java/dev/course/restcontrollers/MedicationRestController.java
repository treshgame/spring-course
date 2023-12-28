package dev.course.restcontrollers;

import dev.course.controllers.MedicationController;
import dev.course.entity.Medication;
import dev.course.entity.Operation;
import dev.course.pojo.AddAmountPOJO;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.SupplierRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
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
    private ResponseEntity<Object> get(){
        Map<String, Object> response = new HashMap<>();
        response.put("medications",  medicationRepository.findAll());
        response.put("suppliers", supplierRepository.findAll());
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/supplied_by/{id}")
    public ResponseEntity<Object> suppliedBy(@PathVariable Long id){
        try{
            List<Medication> medications = medicationRepository.findAllBySupplierId(id);
            Map<String, Object> response = new HashMap<>();
            response.put("medications", medications);
            response.put("suppliers", supplierRepository.findAll());
            return ResponseEntity.status(200).body(response);
        }catch (Exception ex){
            return ResponseEntity.status(400).body(ex.getMessage());
        }
    }

    @PostMapping("/add/amount")
    public ResponseEntity<Object> addAmount(@RequestBody AddAmountPOJO addAmountPOJO){
        if(addAmountPOJO.getAmount() < 0){
            return ResponseEntity.badRequest().body("Количество не может быть отрицательным");
        }

        try{
            Medication medication = medicationRepository.findById(addAmountPOJO.getMedicationId()).orElse(null);
            if(medication == null){
                return ResponseEntity.badRequest().body("Нет медикамента с таким id");
            }
            medication.setAmount(medication.getAmount() + addAmountPOJO.getAmount());
            medicationRepository.save(medication);
            return ResponseEntity.ok().body(medication);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().build();
        }
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
