package com.inventory.smart_inventory.dashboard.controller;

import com.inventory.smart_inventory.dashboard.dto.*;
import com.inventory.smart_inventory.dashboard.service.DashboardService;
import com.inventory.smart_inventory.dashboard.service.impl.DashboardPdfService;
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
    private final DashboardPdfService dashboardPdfService;

    public DashboardController(DashboardService dashboardService,
                               DashboardPdfService dashboardPdfService)
    {
        this.dashboardService = dashboardService;
        this.dashboardPdfService = dashboardPdfService;
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

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/monthly-sales")
    public ResponseEntity<List<MonthlySalesResponse>> getMonthlySales()
    {
        return ResponseEntity.ok(dashboardService.getMonthlySales());
    }


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/monthly-purchases")
    public ResponseEntity<List<MonthlyPurchaseResponse>> getMonthlyPurchases()
    {
        return ResponseEntity.ok(dashboardService.getMonthlyPurchases());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/stock-by-category")
    public ResponseEntity<List<CategoryStockResponse>> getStockDistributionByCategory()
    {
        return ResponseEntity.ok(dashboardService.getStockDistributionByCategory());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/top-selling-products")
    public ResponseEntity<List<TopSellingProductResponse>> getTopSellingProducts()
    {
        return ResponseEntity.ok(dashboardService.getTopSellingProducts());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/pdf")
    public ResponseEntity<byte[]> downloadDashboardPdf() {

        byte[] pdf = dashboardPdfService.generateDashboardPdf();

        return ResponseEntity.ok()
                .header(
                        "Content-Disposition",
                        "attachment; filename=inventory-dashboard-report.pdf"
                )
                .header(
                        "Content-Type",
                        "application/pdf"
                )
                .body(pdf);
    }

}
