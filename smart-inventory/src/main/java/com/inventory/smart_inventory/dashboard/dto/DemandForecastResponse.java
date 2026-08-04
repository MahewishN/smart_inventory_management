package com.inventory.smart_inventory.dashboard.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DemandForecastResponse {

    private Long productId;
    private String productName;
    private Integer currentStock;
    private Integer predictedDemand;
    private Integer recommendedPurchase;
}
