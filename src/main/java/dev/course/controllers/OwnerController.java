package dev.course.controllers;

import dev.course.entity.Owner;
import dev.course.repositories.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class OwnerController {
    @Autowired
    private OwnerRepository ownerRepository;

    @GetMapping("/owners")
    public String index(Model model){
        model.addAttribute("owners", ownerRepository.findAll());
        model.addAttribute("owner", new Owner());
        return "owners";
    }
}
