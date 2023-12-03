package dev.course.controllers;

import dev.course.entity.Vet;
import dev.course.repositories.VetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class VetController {
    @Autowired
    VetRepository vetRepository;
    @GetMapping("/vets")
    public String index(Model model){
        List<Vet> vets = vetRepository.findAll();
        model.addAttribute("vets", vets);
        return "vets";
    }
}
