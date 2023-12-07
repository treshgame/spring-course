package dev.course.restcontrollers;

import dev.course.entity.Operation;
import dev.course.entity.Owner;
import dev.course.repositories.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/operations")
public class OperationRestController {
    @Autowired
    private OperationRepository operationRepository;
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Operation operation){
        try {
            Operation savedOperation = operationRepository.save(operation);

            return ResponseEntity.ok().body(savedOperation);
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
