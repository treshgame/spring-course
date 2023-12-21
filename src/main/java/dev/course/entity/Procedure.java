package dev.course.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "procedures")
@Data
@NoArgsConstructor
public class Procedure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Названии операции не может быть пустым")
    @NotBlank(message = "Название операции не может быть пустым")
    private String name;
    @NotNull(message = "Дата операции не может быть пустой")
    @NotBlank(message = "Дата операции не может быть пустой")
    private String procedureDate;
    @NotNull(message = "Должно быть выбрано животное")
    @ManyToOne
    private Animal animal;
    @NotNull(message = "Должно быть выбрано животное")
    @ManyToOne
    private Vet vet;
    @ManyToOne
    private Medication medication;
    @PositiveOrZero
    private int amount;
}
