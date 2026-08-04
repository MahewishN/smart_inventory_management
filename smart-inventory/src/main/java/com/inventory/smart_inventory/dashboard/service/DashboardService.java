package com.inventory.smart_inventory.dashboard.service;

import com.inventory.smart_inventory.dashboard.dto.DashboardSummaryResponse;
import com.inventory.smart_inventory.dashboard.dto.DemandForecastResponse;
import com.inventory.smart_inventory.dashboard.dto.RestockRecommendationResponse;

import java.util.List;

public interface DashboardService {

    DashboardSummaryResponse getSummary();
    List<RestockRecommendationResponse> getRestockRecommendation();
    List<DemandForecastResponse> getDemandForecast();
}
