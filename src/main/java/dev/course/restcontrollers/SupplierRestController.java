package dev.course.restcontrollers;

import dev.course.entity.Supplier;
import dev.course.entity.Vet;
import dev.course.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/suppliers")
public class SupplierRestController {
    @Autowired
    SupplierRepository supplierRepository;
    @PostMapping("/add")
    public ResponseEntity<Object> add(@RequestBody Supplier supplier){
        try {
            Supplier savedSupplier = supplierRepository.save(supplier);
            return ResponseEntity.ok().body(savedSupplier);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        try {
            supplierRepository.deleteById(id);
            return ResponseEntity.status(200).body("");
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody Supplier supplier){
        if(supplierRepository.findById(supplier.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Vet with such ID is not found");
        }
        try{
            supplierRepository.save(supplier);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}
