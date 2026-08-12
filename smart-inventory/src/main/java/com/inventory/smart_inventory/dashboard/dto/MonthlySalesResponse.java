package com.inventory.smart_inventory.dashboard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonthlySalesResponse {

    private String month;
    private Long totalSales;

    public MonthlySalesResponse(String month, Long totalSales) {
        this.month = month;
        this.totalSales = totalSales;
    }
}
