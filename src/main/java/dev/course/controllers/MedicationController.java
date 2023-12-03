package dev.course.controllers;

import dev.course.entity.Medication;
import dev.course.entity.Supplier;
import dev.course.repositories.MedicationRepository;
import dev.course.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MedicationController {
    @Autowired
    MedicationRepository medicationRepository;
    @Autowired
    SupplierRepository supplierRepository;
    @GetMapping("/medications")
    public String index(Model model){
        List<Medication> medications = medicationRepository.findAll();
        List<Supplier> suppliers = supplierRepository.findAll();
        model.addAttribute("medications", medications);
        model.addAttribute("suppliers", suppliers);
        return "medications";
    }
}
