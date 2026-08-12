package com.inventory.smart_inventory.dashboard.service.impl;

import com.inventory.smart_inventory.category.repository.CategoryRepository;
import com.inventory.smart_inventory.dashboard.dto.*;
import com.inventory.smart_inventory.dashboard.service.DashboardService;
import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.product.repository.ProductRepository;
import com.inventory.smart_inventory.transaction.entity.InventoryTransaction;
import com.inventory.smart_inventory.transaction.entity.TransactionType;
import com.inventory.smart_inventory.transaction.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public DashboardServiceImpl(ProductRepository productRepository,
                                CategoryRepository categoryRepository,
                                TransactionRepository transactionRepository)
    {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }

    @Override
    public List<RestockRecommendationResponse> getRestockRecommendation() {
        List<Product> products = productRepository.findByActiveTrue();

        return products.stream()
                .filter(product -> product.getQuantity() < product.getMinimumStockLevel())
                .map(product -> RestockRecommendationResponse.builder()
                        .productId(product.getId())
                        .productName(product.getName())
                        .currentStock(product.getQuantity())
                        .minimumStockLevel(product.getMinimumStockLevel())
                        .recommendedRestockQuantity(product.getMinimumStockLevel() - product.getQuantity())
                        .build())
                .toList();
    }

    @Override
    public List<DemandForecastResponse> getDemandForecast() {
        List<Product> products = productRepository.findByActiveTrue();

        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(30);

        return products.stream()
                .map(product -> {
                    List<InventoryTransaction> sales = transactionRepository.
                            findByProductAndTransactionTypeAndTransactionDateBetween(
                            product, TransactionType.SALE,startDate,endDate
                    );

                    int predictedDemand;

                    if(sales.isEmpty())
                    {
                        predictedDemand = product.getMinimumStockLevel();
                    }
                    else
                    {
                        predictedDemand = sales.stream()
                                .mapToInt(InventoryTransaction::getQuantity)
                                .sum();
                    }

                    int recommendedPurchase = Math.max(predictedDemand - product.getQuantity(), 0);

                    return DemandForecastResponse.builder()
                            .productId(product.getId())
                            .productName(product.getName())
                            .currentStock(product.getQuantity())
                            .predictedDemand(predictedDemand)
                            .recommendedPurchase(recommendedPurchase)
                            .build();
                })
                .toList();
    }

    @Override
    public DashboardSummaryResponse getSummary() {

        long totalProducts = productRepository.countByActiveTrue();
        long totalCategories = categoryRepository.countByActiveTrue();
        long lowStockProducts = productRepository.findByActiveTrue()
                .stream()
                .filter(product -> product.getQuantity() < product.getMinimumStockLevel())
                .count();

        int currentStock = productRepository.findByActiveTrue()
                .stream()
                .mapToInt(Product::getQuantity)
                .sum();

        List<InventoryTransaction> purchases = transactionRepository.findByTransactionType(TransactionType.PURCHASE);

        int totalPurchased = purchases.stream()
                .mapToInt(InventoryTransaction::getQuantity)
                .sum();

        List<InventoryTransaction> sales = transactionRepository.findByTransactionType(TransactionType.SALE);

        int totalSold = sales.stream()
                .mapToInt(InventoryTransaction::getQuantity)
                .sum();

        return DashboardSummaryResponse.builder()
                .totalProducts(totalProducts)
                .totalCategories(totalCategories)
                .currentStock(currentStock)
                .lowStockProducts(lowStockProducts)
                .totalPurchased(totalPurchased)
                .totalSold(totalSold)
                .build();
    }

    @Override
    public List<MonthlySalesResponse> getMonthlySales() {

        return transactionRepository.getMonthlySales()
                .stream()
                .map(row -> new MonthlySalesResponse(
                        (String) row[0],
                        ((Number) row[1]).longValue()
                ))
                .toList();
    }

    @Override
    public List<MonthlyPurchaseResponse> getMonthlyPurchases() {

        return transactionRepository.getMonthlyPurchases()
                .stream()
                .map(row -> new MonthlyPurchaseResponse(
                        (String) row[0],
                        ((Number) row[1]).longValue()
                ))
                .toList();
    }

    @Override
    public List<CategoryStockResponse> getStockDistributionByCategory() {
        return productRepository.getStockDistributionByCategory();
    }

    @Override
    public List<TopSellingProductResponse> getTopSellingProducts() {
        return transactionRepository.getTopSellingProducts()
                .stream()
                .limit(5)
                .toList();
    }

}
