package com.inventory.smart_inventory.category.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCategoryRequest {
    @NotBlank(message = "Category name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;
}
