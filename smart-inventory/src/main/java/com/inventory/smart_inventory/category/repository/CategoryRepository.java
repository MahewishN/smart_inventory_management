package com.inventory.smart_inventory.category.repository;

import com.inventory.smart_inventory.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findByNameIgnoreCase(String name);
    long countByActiveTrue();
}
