package com.inventory.smart_inventory.category.controller;


import com.inventory.smart_inventory.category.dto.CategoryResponse;
import com.inventory.smart_inventory.category.dto.CreateCategoryRequest;
import com.inventory.smart_inventory.category.dto.UpdateCategoryRequest;
import com.inventory.smart_inventory.category.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService)
    {
        this.categoryService = categoryService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(
            @Valid
            @RequestBody
            CreateCategoryRequest request)
    {
        return ResponseEntity.ok(categoryService.createCategory(request));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories()
    {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @PathVariable Long id)
    {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid
            @RequestBody UpdateCategoryRequest request)
    {
        return ResponseEntity.ok(categoryService.updateCategory(id,request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateCategory(
            @PathVariable Long id)
    {
        categoryService.deactivateCategory(id);

        return ResponseEntity.ok("Category deactivated successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/activate")
    public ResponseEntity<String> activateCategory(
            @PathVariable Long id)
    {
        categoryService.activateCategory(id);

        return ResponseEntity.ok("Category activated successfully");
    }
}
