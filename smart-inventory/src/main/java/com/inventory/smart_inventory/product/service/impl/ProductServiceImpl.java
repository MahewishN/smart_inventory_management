package com.inventory.smart_inventory.product.service.impl;

import com.inventory.smart_inventory.category.entity.Category;
import com.inventory.smart_inventory.category.repository.CategoryRepository;
import com.inventory.smart_inventory.exception.CategoryAlreadyExistsException;
import com.inventory.smart_inventory.exception.CategoryNotFoundException;
import com.inventory.smart_inventory.exception.ProductAlreadyExistsException;
import com.inventory.smart_inventory.exception.ProductNotFoundException;
import com.inventory.smart_inventory.product.dto.CreateProductRequest;
import com.inventory.smart_inventory.product.dto.ProductResponse;
import com.inventory.smart_inventory.product.dto.UpdateProductRequest;
import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.product.repository.ProductRepository;
import com.inventory.smart_inventory.product.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              CategoryRepository categoryRepository)
    {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ProductResponse createProduct(CreateProductRequest request) {

        if (productRepository.findBySkuIgnoreCase(request.getSku()).isPresent()) {
            throw new ProductAlreadyExistsException("Product SKU already exists");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() ->
                        new CategoryNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .sku(request.getSku())
                .brand(request.getBrand())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .minimumStockLevel(request.getMinimumStockLevel())
                .category(category)
                .active(true)
                .build();

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(()->new ProductNotFoundException("Product not found"));

        return mapToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(()-> new ProductNotFoundException("Product not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()-> new CategoryNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setSku(request.getSku());
        product.setBrand(request.getBrand());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setMinimumStockLevel(request.getMinimumStockLevel());
        product.setCategory(category);
        product.setActive(request.getActive());

        Product updatedProduct = productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    @Override
    public void deactivateProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(()->new ProductNotFoundException("Product not found"));

        product.setActive(false);
        productRepository.save(product);

    }

    @Override
    public void activateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setActive(true);
        productRepository.save(product);
    }

    private ProductResponse mapToResponse(Product product)
    {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .sku(product.getDescription())
                .brand(product.getBrand())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .minimumStockLevel(product.getMinimumStockLevel())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .active(product.getActive())
                .build();
    }
}
