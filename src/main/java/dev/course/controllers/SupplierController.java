package dev.course.controllers;

import dev.course.entity.Supplier;
import dev.course.repositories.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class SupplierController {
    @Autowired
    SupplierRepository supplierRepository;
    @GetMapping("/suppliers")
    public String index(Model model){
        List<Supplier> suppliers = supplierRepository.findAll();
        model.addAttribute("suppliers", suppliers);
        return "suppliers";
    }
}
