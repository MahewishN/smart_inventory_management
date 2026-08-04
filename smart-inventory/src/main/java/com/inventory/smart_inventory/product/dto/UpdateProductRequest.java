package com.inventory.smart_inventory.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "SKU is required")
    private String sku;

    @NotBlank(message = "Brand is required")
    private String brand;

    @NotNull(message = "Price is required")
    private BigDecimal price;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Category is required")
    private Long categoryId;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private Integer minimumStockLevel;
}