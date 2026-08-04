package com.inventory.smart_inventory.product.service;

import com.inventory.smart_inventory.product.dto.CreateProductRequest;
import com.inventory.smart_inventory.product.dto.ProductResponse;
import com.inventory.smart_inventory.product.dto.UpdateProductRequest;

import java.util.List;

public interface ProductService {
    ProductResponse createProduct(CreateProductRequest request);

    List<ProductResponse> getAllProducts();

    ProductResponse getProductById(Long id);

    ProductResponse updateProduct(Long id, UpdateProductRequest request);

    void deactivateProduct(Long id);
    void activateProduct(Long id);
}
