package dev.course.repositories;

import dev.course.entity.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Controller;

@Controller
public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
