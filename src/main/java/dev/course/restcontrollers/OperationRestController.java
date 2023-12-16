package dev.course.restcontrollers;

import dev.course.entity.Animal;
import dev.course.entity.Operation;
import dev.course.entity.Owner;
import dev.course.entity.Vet;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.OperationRepository;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
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
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Operation operation){
        try {
            Operation savedOperation = operationRepository.save(operation);

            // Fetch the updated lists of animals, vets, and assistants
            List<Animal> animals = animalRepository.findAll();
            List<Vet> vets = vetRepository.findAll();
            List<Vet> assistants = vetRepository.findAll(); // You might need to change this if assistants are different from vets

            // Create a custom response object
            Map<String, Object> response = new HashMap<>();
            response.put("operation", savedOperation);
            response.put("animals", animals);
            response.put("vets", vets);
            response.put("assistants", assistants);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            // Возвращаем ответ с ошибкой и сообщением об ошибке
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
    public ResponseEntity<Object> update(@RequestBody Operation operation){
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
