package dev.course.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    @NotNull
    private int age;
    @NotNull
    private String kind;
    @NotNull
    private String breed;
    @NotNull
    @ManyToOne
    private Owner owner;
    @NotNull
    @ManyToOne
    private Vet attendingVet;
}
