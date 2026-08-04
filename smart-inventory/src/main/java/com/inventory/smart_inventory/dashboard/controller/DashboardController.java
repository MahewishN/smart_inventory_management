package com.inventory.smart_inventory.dashboard.controller;


import com.inventory.smart_inventory.dashboard.dto.DashboardSummaryResponse;
import com.inventory.smart_inventory.dashboard.dto.DemandForecastResponse;
import com.inventory.smart_inventory.dashboard.dto.RestockRecommendationResponse;
import com.inventory.smart_inventory.dashboard.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService)
    {
        this.dashboardService = dashboardService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryResponse> getSummary()
    {
        return ResponseEntity.ok(dashboardService.getSummary());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/restock-recommendations")
    public ResponseEntity<List<RestockRecommendationResponse>> getRestockRecommendations()
    {
        return ResponseEntity.ok(dashboardService.getRestockRecommendation());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/demand-forecast")
    public ResponseEntity<List<DemandForecastResponse>> getDemandForecast()
    {
        return ResponseEntity.ok(dashboardService.getDemandForecast());
    }
}
