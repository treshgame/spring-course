package dev.course.controllers;

import dev.course.entity.Animal;
import dev.course.entity.Owner;
import dev.course.entity.Vet;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.OwnerRepository;
import dev.course.repositories.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class AnimalController {
    @Autowired
    AnimalRepository animalRepository;
    @Autowired
    VetRepository vetRepository;
    @Autowired
    OwnerRepository ownerRepository;
    @GetMapping("/animals")
    public String index(Model model){
        List<Animal> animals = animalRepository.findAll();
        List<Owner> owners = ownerRepository.findAll();
        List<Vet> vets = vetRepository.findAll();
        model.addAttribute("animals", animals);
        model.addAttribute("owners", owners);
        model.addAttribute("vets", vets);
        return "animals";
    }
}
