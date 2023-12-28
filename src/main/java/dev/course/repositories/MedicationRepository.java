package dev.course.repositories;

import dev.course.entity.Medication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicationRepository extends JpaRepository<Medication,Long> {
    public List<Medication> findAllBySupplierId(Long id);
}
