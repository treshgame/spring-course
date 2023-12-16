package dev.course.restcontrollers;

import dev.course.entity.Animal;
import dev.course.entity.Medication;
import dev.course.entity.Owner;
import dev.course.entity.Vet;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.OwnerRepository;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/animals")
@Hidden
public class AnimalRestController {
    @Autowired
    AnimalRepository animalRepository;
    @Autowired
    VetRepository vetRepository;
    @Autowired
    OwnerRepository ownerRepository;

    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Animal animal){
        try{
            Animal savedAnimal = animalRepository.save(animal);
            List<Owner> owners = ownerRepository.findAll();
            List<Vet> vets = vetRepository.findAll();

            // Create a custom response object
            Map<String, Object> response = new HashMap<>();
            response.put("animal", savedAnimal);
            response.put("owners", owners);
            response.put("vets", vets);
            return ResponseEntity.ok().body(response);
        }catch (Exception ex){
            return ResponseEntity.status(200).body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            animalRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody Animal animal){
        System.out.println(animal);
        if(animalRepository.findById(animal.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            animalRepository.save(animal);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
