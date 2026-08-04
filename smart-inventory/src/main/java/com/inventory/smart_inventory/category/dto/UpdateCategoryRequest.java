package com.inventory.smart_inventory.category.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateCategoryRequest {

    @NotBlank(message = "Category name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Active status is required")
    private Boolean active;
}
