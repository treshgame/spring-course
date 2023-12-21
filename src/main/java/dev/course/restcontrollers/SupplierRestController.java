package dev.course.restcontrollers;

import dev.course.entity.Supplier;
import dev.course.repositories.SupplierRepository;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@Tag(
        name = "Поставщики",
        description = "Контроллер для соверешения операций с поставщиками"
)
public class SupplierRestController {
    @Autowired
    SupplierRepository supplierRepository;

    @Hidden
    @GetMapping("/get")
    public List<Supplier> get(){
        return supplierRepository.findAll();
    }

    @Operation(description = "Добавление поставщика", summary = "Добавляет поставщика в базу данных")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ошибка сервера в случае не доабвления"),
            @ApiResponse(responseCode = "504", description = "Ошибка сервера в случае не добавления поставщика")
    })
    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Supplier supplier){
        try {
            Supplier savedSupplier = supplierRepository.save(supplier);
            return ResponseEntity.status(200).body(savedSupplier);
        }catch (Exception ex){
            return ResponseEntity.internalServerError().body(ex.getMessage());
        }
    }

    @Operation(
            description = "Удалить поставщика",
            summary = "Удаляет поставщика из базы данных"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(
            @Schema(name = "Id", type = "Long", example = "2")
            @PathVariable @Parameter(name = "id", description = "Id удаляемого поставщика", required = true) Long id){
        try {
            supplierRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }catch(Exception ex){
            return ResponseEntity.status(400).body("Ошибка");
        }
    }

    @Operation(
            summary = "Обновить поставщика",
            description = "Обновляет поставщика в базе данных"
    )
    @PutMapping("/update")
    public ResponseEntity<Object> update(@Valid @RequestBody Supplier supplier){
        if(supplierRepository.findById(supplier.getId()).isEmpty()){
            return ResponseEntity.status(400).body("Supplier with such ID is not found");
        }
        try{
            supplierRepository.save(supplier);
            return ResponseEntity.noContent().build();
        }catch (Exception ex){
            return ResponseEntity.status(504).body(ex.getMessage());
        }
    }
}

