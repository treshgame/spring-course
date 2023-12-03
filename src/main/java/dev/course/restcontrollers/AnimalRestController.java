package dev.course.restcontrollers;

import dev.course.entity.Animal;
import dev.course.entity.Medication;
import dev.course.repositories.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/animals")
public class AnimalRestController {
    @Autowired
    AnimalRepository animalRepository;

    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Animal animal){
        try{
            Animal savedAnimal = animalRepository.save(animal);
            // Возвращаем успешный ответ с добавленным животным
            return ResponseEntity.ok().body(savedAnimal);
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
