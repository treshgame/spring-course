package dev.course.restcontrollers;

import dev.course.entity.Procedure;
import dev.course.entity.Supplier;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.ProcedureRepository;
import dev.course.repositories.VetRepository;
import io.swagger.v3.oas.annotations.Hidden;
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
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Procedure procedure){
        try{
            Procedure savedProcedure = procedureRepository.save(procedure);
            Map<String, Object> response = new HashMap<>();
            response.put("procedure", savedProcedure);
            response.put("animals", animalRepository.findAll());
            response.put("vets", vetRepository.findAll());
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
    public ResponseEntity<Object> update(@RequestBody Procedure procedure){
        if(procedureRepository.findById(procedure.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Procedure with such ID is not found");
        }
        try{
            procedureRepository.save(procedure);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
