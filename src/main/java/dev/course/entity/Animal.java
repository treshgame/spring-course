package dev.course.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "animal")
@Data
@NoArgsConstructor
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull

    private String name;
    @PositiveOrZero(message = "Число не должно быть меньше нуля")
    private int age;
    @NotNull(message = "Вид животного не должен быть пустым")
    @NotBlank(message = "Вид животного не должен быть пустым")
    private String kind;
    @NotNull(message = "Порода животного не должен быть пустым")
    @NotBlank(message = "Порода животного не должен быть пустым")
    private String breed;
    @NotNull(message = "Владелец должен быть выбрал")
    @ManyToOne
    private Owner owner;
    @NotNull(message = "Врач должен быть выбран")
    @ManyToOne
    private Vet attendingVet;
}
