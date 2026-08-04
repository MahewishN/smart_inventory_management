package com.inventory.smart_inventory.category.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Long id;
    private String name;
    private String description;
    private Boolean active;
}
