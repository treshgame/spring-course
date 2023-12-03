package dev.course.controllers;

import dev.course.entity.Animal;
import dev.course.entity.Operation;
import dev.course.entity.Vet;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.OperationRepository;
import dev.course.repositories.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class OperationController {
    @Autowired
    OperationRepository operationRepository;
    @Autowired
    VetRepository vetRepository;
    @Autowired
    AnimalRepository animalRepository;
    @GetMapping("/operations")
    public String index(Model model){
        List<Vet> vets = vetRepository.findAll();
        List<Operation> operations = operationRepository.findAll();
        List<Animal> animals = animalRepository.findAll();
        model.addAttribute("vets", vets);
        model.addAttribute("operations", operations);
        model.addAttribute("animals", animals);
        return "operations";
    }
}
