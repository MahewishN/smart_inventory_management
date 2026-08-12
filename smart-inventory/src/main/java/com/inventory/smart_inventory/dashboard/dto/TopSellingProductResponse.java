package com.inventory.smart_inventory.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopSellingProductResponse {

    private Long productId;
    private String productName;
    private Long totalSold;

    public TopSellingProductResponse(
            Long productId,
            String productName,
            Long totalSold
    ) {
        this.productId = productId;
        this.productName = productName;
        this.totalSold = totalSold;
    }
}