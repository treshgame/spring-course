package dev.course.restcontrollers;

import dev.course.entity.Owner;
import dev.course.entity.Procedure;
import dev.course.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/owners")
public class OwnerRestController {
    @Autowired
    public OwnerRepository ownerRepository;

    @PostMapping("/add")
    public ResponseEntity<Object> addOwner(@RequestBody Owner owner){
        try {
            Owner savedOwner = ownerRepository.save(owner);
            return ResponseEntity.ok().body(savedOwner.getId());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ошибка при добавлении владельца" + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            ownerRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody Owner owner){
        if(ownerRepository.findById(owner.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            ownerRepository.save(owner);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
