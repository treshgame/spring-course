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
    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Operation operation){
        try {
            Operation savedOperation = operationRepository.save(operation);
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
        if(operationRepository.findById(operation.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Operation with such ID is not found");
        }
        try{
            operationRepository.save(operation);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
