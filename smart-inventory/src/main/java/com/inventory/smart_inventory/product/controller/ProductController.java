package com.inventory.smart_inventory.product.controller;


import com.inventory.smart_inventory.product.dto.CreateProductRequest;
import com.inventory.smart_inventory.product.dto.ProductResponse;
import com.inventory.smart_inventory.product.dto.UpdateProductRequest;
import com.inventory.smart_inventory.product.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService)
    {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid
            @RequestBody CreateProductRequest request)
    {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts()
    {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id)
    {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid
            @RequestBody UpdateProductRequest request)
    {
        return ResponseEntity.ok(productService.updateProduct(id,request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateProduct(@PathVariable Long id)
    {
        productService.deactivateProduct(id);

        return ResponseEntity.ok("Product deactivated successfully");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/activate")
    public ResponseEntity<String> activateProduct(@PathVariable Long id) {
        productService.activateProduct(id);

        return ResponseEntity.ok("Product activated successfully");
    }


}
