package com.inventory.smart_inventory.category.service;

import com.inventory.smart_inventory.category.dto.CategoryResponse;
import com.inventory.smart_inventory.category.dto.CreateCategoryRequest;
import com.inventory.smart_inventory.category.dto.UpdateCategoryRequest;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);

    List<CategoryResponse> getAllCategories();

    CategoryResponse getCategoryById(Long id);

    CategoryResponse updateCategory(Long id, UpdateCategoryRequest request);

    void deactivateCategory(Long id);

    void activateCategory(Long id);
}
