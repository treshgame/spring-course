package dev.course.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "suppliers")
@Data
@NoArgsConstructor
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Имя не должно быть пустым")
    @NotBlank(message = "Имя не должно быть пустым")
    @Size(max = 255, message = "Слишком длинное имя, максимальная длина - 255")
    private String name;
    @NotNull(message = "Номер телефона не должен быть пустым")
    @NotBlank(message = "Номер телефона не должен быть пустым")
    private String phoneNum;
    @Email(message = "Адресс электронной почты не проходит валидацию")
    private String email;
}