package dev.course.restcontrollers;

import dev.course.entity.Procedure;
import dev.course.entity.Supplier;
import dev.course.repositories.ProcedureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/procedures")
public class ProcedureRestController {
    @Autowired
    ProcedureRepository procedureRepository;
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Procedure procedure){
        try{
            Procedure savedProcedure = procedureRepository.save(procedure);
            return ResponseEntity.ok().body(savedProcedure);
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
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            procedureRepository.save(procedure);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
