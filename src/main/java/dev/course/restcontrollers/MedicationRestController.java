package dev.course.restcontrollers;

import dev.course.controllers.MedicationController;
import dev.course.entity.Medication;
import dev.course.entity.Operation;
import dev.course.repositories.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medications")
public class MedicationRestController {
    @Autowired
    MedicationRepository medicationRepository;
    @GetMapping("/get")
    private List<Medication> get(){
        return medicationRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Medication medication){
        try {
            Medication savedMedication = medicationRepository.save(medication);
            return ResponseEntity.status(200).body(savedMedication);
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
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody Medication medication){
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
