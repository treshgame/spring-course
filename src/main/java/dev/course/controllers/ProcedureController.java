package dev.course.controllers;

import dev.course.entity.Animal;
import dev.course.entity.Medication;
import dev.course.entity.Procedure;
import dev.course.entity.Vet;
import dev.course.repositories.AnimalRepository;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.ProcedureRepository;
import dev.course.repositories.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ProcedureController {
    @Autowired
    ProcedureRepository procedureRepository;
    @Autowired
    VetRepository vetRepository;
    @Autowired
    AnimalRepository animalRepository;
    @Autowired
    MedicationRepository medicationRepository;
    @GetMapping("/procedures")
    public String index(Model model){
        List<Procedure> procedures = procedureRepository.findAll();
        List<Vet> vets = vetRepository.findAll();
        List<Animal> animals = animalRepository.findAll();
        List<Medication> medications = medicationRepository.findAll();
        model.addAttribute("procedures", procedures);
        model.addAttribute("vets", vets);
        model.addAttribute("animals", animals);
        model.addAttribute("medications", medications);
        return "procedures";
    }
}
