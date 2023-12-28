package dev.course.restcontrollers;

import dev.course.entity.*;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.OperationRepository;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/operations")
@Hidden
public class OperationRestController {
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private VetRepository vetRepository;
    @Autowired
    private AnimalRepository animalRepository;
    @Autowired
    private MedicationRepository medicationRepository;

    @GetMapping("/get")
    public ResponseEntity<Object> get (){
        try{
            List<Operation> operations = operationRepository.findAll();
            return ResponseEntity.status(200).body(operations);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Operation operation){
        Medication medication = medicationRepository.findById(operation.getMedication().getId()).orElse(null);
        if(medication.getAmount() - operation.getAmount() < 0){
            Map<String, String> errors = new HashMap<>();
            errors.put("amount", "На складе нет такого количества препарата, оставшееся количество: " + medication.getAmount());
            return ResponseEntity.badRequest().body(errors);
        }

        medication.setAmount(medication.getAmount() - operation.getAmount());
        try {
            Operation savedOperation = operationRepository.save(operation);
            medicationRepository.save(medication);
            List<Animal> animals = animalRepository.findAll();
            List<Vet> vets = vetRepository.findAll();
            List<Medication> medications = medicationRepository.findAll();
            Map<String, Object> response = new HashMap<>();
            response.put("operation", savedOperation);
            response.put("animals", animals);
            response.put("vets", vets);
            response.put("medications", medications);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении операции");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            operationRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Operation operation){
        Operation oldOperation = operationRepository.findById(operation.getId()).orElse(null);
        if(oldOperation == null){
            return ResponseEntity.status(400).body("Операция с таким Id не существует");
        }

        Medication medication = medicationRepository.findById(operation.getMedication().getId()).orElse(null);
        if(medication.getAmount() - (operation.getAmount() - oldOperation.getAmount()) < 0){
            Map<String, String> errors = new HashMap<>();
            errors.put("amount", "На складе нет такого количества препарата, оставшееся количество: " + medication.getAmount());
            return ResponseEntity.badRequest().body(errors);
        }
        medication.setAmount(medication.getAmount() - (operation.getAmount() - oldOperation.getAmount()));
        System.out.println(medication);
        
        try{
            operationRepository.save(operation);
            medicationRepository.save(medication);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
