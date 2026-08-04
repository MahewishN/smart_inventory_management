package com.inventory.smart_inventory.product.repository;

import com.inventory.smart_inventory.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findBySkuIgnoreCase(String sku);

    long countByActiveTrue();

    List<Product> findByActiveTrue();
}
