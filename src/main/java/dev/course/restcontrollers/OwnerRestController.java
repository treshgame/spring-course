package dev.course.restcontrollers;

import dev.course.entity.Owner;
import dev.course.entity.Procedure;
import dev.course.repositories.OwnerRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/owners")
@Hidden
public class OwnerRestController {
    @Autowired
    public OwnerRepository ownerRepository;

    @PostMapping("/add")
    public ResponseEntity<Object> addOwner(@Valid @RequestBody Owner owner){
        try {
            Owner savedOwner = ownerRepository.save(owner);
            return ResponseEntity.ok().body(savedOwner);
        } catch (Exception e) {
            return ResponseEntity.status(504).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            ownerRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Owner owner){
        if(ownerRepository.findById(owner.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Owner with such ID is not found");
        }

        try{
            ownerRepository.save(owner);
            return ResponseEntity.status(200).build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
