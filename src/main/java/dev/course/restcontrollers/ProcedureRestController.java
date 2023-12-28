package dev.course.restcontrollers;

import dev.course.entity.Medication;
import dev.course.entity.Operation;
import dev.course.entity.Procedure;
import dev.course.entity.Supplier;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.ProcedureRepository;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/procedures")
@Hidden
public class ProcedureRestController {
    @Autowired
    ProcedureRepository procedureRepository;
    @Autowired
    AnimalRepository animalRepository;
    @Autowired
    VetRepository vetRepository;
    @Autowired
    MedicationRepository medicationRepository;

    public ResponseEntity<Object> get(){
        try{
            return ResponseEntity.status(200).body(procedureRepository.findAll());
        }catch(Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Procedure procedure){
        Medication medication = medicationRepository.findById(procedure.getMedication().getId()).orElse(null);
        if(medication.getAmount() - procedure.getAmount() < 0){
            Map<String, String> errors = new HashMap<>();
            errors.put("amount", "На складе нет такого количества препарата, оставшееся количество: " + medication.getAmount());
            return ResponseEntity.badRequest().body(errors);
        }

        medication.setAmount(medication.getAmount() - procedure.getAmount());
        try{
            Procedure savedProcedure = procedureRepository.save(procedure);
            medicationRepository.save(medication);
            Map<String, Object> response = new HashMap<>();
            response.put("procedure", savedProcedure);
            response.put("animals", animalRepository.findAll());
            response.put("vets", vetRepository.findAll());
            response.put("medications", medicationRepository.findAll());
            return ResponseEntity.ok().body(response);
        }catch(Exception ex){
            ex.printStackTrace();
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            procedureRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Procedure procedure){
        Procedure oldProcedure = procedureRepository.findById(procedure.getId()).orElse(null);
        if(oldProcedure == null){
            return ResponseEntity.status(400).body("Процедура с таким Id не существует");
        }

        Medication medication = medicationRepository.findById(procedure.getMedication().getId()).orElse(null);
        if(medication.getAmount() - (procedure.getAmount() - oldProcedure.getAmount()) < 0){
            Map<String, String> errors = new HashMap<>();
            errors.put("amount", "На складе нет такого количества препарата, оставшееся количество: " + medication.getAmount());
            return ResponseEntity.badRequest().body(errors);
        }
        medication.setAmount(medication.getAmount() - (procedure.getAmount() - oldProcedure.getAmount()));
        System.out.println(medication);

        try{
            procedureRepository.save(procedure);
            medicationRepository.save(medication);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
