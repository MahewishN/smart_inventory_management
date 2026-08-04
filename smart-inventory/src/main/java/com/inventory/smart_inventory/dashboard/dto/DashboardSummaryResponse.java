package com.inventory.smart_inventory.dashboard.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DashboardSummaryResponse {
    private Long totalProducts;
    private Long totalCategories;
    private Integer currentStock;
    private Long lowStockProducts;
    private Integer totalPurchased;
    private Integer totalSold;
}
