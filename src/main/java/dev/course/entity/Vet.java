package dev.course.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vets")
@Data
@NoArgsConstructor
public class Vet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "ФИО не должно быть пустым")
    @NotNull(message = "ФИО не должно быть пустым")
    private String fullName;
    @NotBlank(message = "Основная специализация не должна быть пустой")
    @NotNull(message = "Основная специализация не должна быть пустой")
    private String mainSpecialization;
    private String secondSpecialization;
    @NotBlank(message = "Должность не должна быть пустой")
    @NotNull(message = "Должность не должна быть пустой")
    private String position;
}
