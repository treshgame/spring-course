package dev.course.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Entity
@Table(name = "operations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Название операции не может быть пустым")
    private String name;
    @NotBlank(message = "Дата операции не может быть пустым")
    private String operationDate;
    @NotNull(message = "Животное должно быть выбрано")
    @ManyToOne
    private Animal animal;
    @NotNull(message = "Врач должен быть выбран")
    @ManyToOne
    private Vet vet;
    @NotNull(message = "Ассистент должен быть выбран")
    @ManyToOne
    private Vet assistant;
    @ManyToOne
    private Medication medication;
    @PositiveOrZero
    private int amount;

}
