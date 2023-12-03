package dev.course.restcontrollers;

import dev.course.controllers.MedicationController;
import dev.course.entity.Medication;
import dev.course.entity.Operation;
import dev.course.repositories.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/medications")
public class MedicationRestController {
    @Autowired
    MedicationRepository medicationRepository;
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Medication medication){
        try {
            Medication savedMedication = medicationRepository.save(medication);
            return ResponseEntity.ok().body(savedMedication);
        }catch (Exception ex){
            return ResponseEntity.status(400).body(ex.getMessage());
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
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            medicationRepository.save(medication);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
