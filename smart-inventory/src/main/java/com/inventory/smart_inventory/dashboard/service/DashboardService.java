package com.inventory.smart_inventory.dashboard.service;

import com.inventory.smart_inventory.dashboard.dto.CategoryStockResponse;
import com.inventory.smart_inventory.dashboard.dto.DashboardSummaryResponse;
import com.inventory.smart_inventory.dashboard.dto.DemandForecastResponse;
import com.inventory.smart_inventory.dashboard.dto.MonthlyPurchaseResponse;
import com.inventory.smart_inventory.dashboard.dto.MonthlySalesResponse;
import com.inventory.smart_inventory.dashboard.dto.RestockRecommendationResponse;
import com.inventory.smart_inventory.dashboard.dto.TopSellingProductResponse;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getSummary();
    List<RestockRecommendationResponse> getRestockRecommendation();
    List<DemandForecastResponse> getDemandForecast();

    // Chart data
    List<MonthlySalesResponse> getMonthlySales();
    List<MonthlyPurchaseResponse> getMonthlyPurchases();
    List<CategoryStockResponse> getStockDistributionByCategory();
    List<TopSellingProductResponse> getTopSellingProducts();

}