package com.inventory.smart_inventory.product.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private String sku;
    private String brand;
    private BigDecimal price;
    private Integer quantity;
    private Long categoryId;
    private String categoryName;
    private Boolean active;
    private Integer minimumStockLevel;
}