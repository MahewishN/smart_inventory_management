package com.inventory.smart_inventory.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonthlyPurchaseResponse {

    private String month;
    private Long totalPurchase;

    public MonthlyPurchaseResponse(String month, Long totalPurchase) {
        this.month = month;
        this.totalPurchase = totalPurchase;
    }
}