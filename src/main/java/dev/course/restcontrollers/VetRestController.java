package dev.course.restcontrollers;

import dev.course.entity.Vet;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vets")
@Hidden
public class VetRestController {
    @Autowired
    VetRepository vetRepository;
    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Vet vet){
        try {
            Vet savedVet = vetRepository.save(vet);
            return ResponseEntity.status(200).body(savedVet);
        } catch (Exception e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            vetRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Vet vet){
        if(vetRepository.findById(vet.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            vetRepository.save(vet);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
