package com.inventory.smart_inventory.product.repository;

import com.inventory.smart_inventory.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.smart_inventory.dashboard.dto.CategoryStockResponse;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySkuIgnoreCase(String sku);

    long countByActiveTrue();

    List<Product> findByActiveTrue();

    long countByQuantityLessThan(Integer quantity);

    long countByActiveTrueAndQuantityLessThan(Integer quantity);

    @Query("""
        SELECT new com.inventory.smart_inventory.dashboard.dto.CategoryStockResponse(
            c.name,
            SUM(p.quantity)
        )
        FROM Product p
        JOIN p.category c
        WHERE p.active = true
        GROUP BY c.name
        ORDER BY SUM(p.quantity) DESC
        """)
    List<CategoryStockResponse> getStockDistributionByCategory();

}
