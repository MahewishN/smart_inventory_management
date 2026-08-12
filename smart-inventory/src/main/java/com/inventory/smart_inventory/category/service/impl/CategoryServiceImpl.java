package com.inventory.smart_inventory.category.service.impl;


import com.inventory.smart_inventory.category.dto.CategoryResponse;
import com.inventory.smart_inventory.category.dto.CreateCategoryRequest;
import com.inventory.smart_inventory.category.dto.UpdateCategoryRequest;
import com.inventory.smart_inventory.category.entity.Category;
import com.inventory.smart_inventory.category.repository.CategoryRepository;
import com.inventory.smart_inventory.category.service.CategoryService;
import com.inventory.smart_inventory.exception.CategoryAlreadyExistsException;
import com.inventory.smart_inventory.exception.CategoryNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if(categoryRepository.findByNameIgnoreCase(request.getName()).isPresent())
        {
            throw new CategoryAlreadyExistsException("Category already exists");
        }
        Category category = Category.builder()
                .name(request.getName())
                .description((request.getDescription()))
                .active(true)
                .build();

        Category savedCategory = categoryRepository.save(category);
        return mapToResponse(savedCategory);
    }

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new CategoryNotFoundException("Category not found"));
        return mapToResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(Long id, UpdateCategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(()->new CategoryNotFoundException("Category not found"));

        categoryRepository.findByNameIgnoreCase(request.getName())
                        .ifPresent(existingCategory -> {
                            if(!existingCategory.getId().equals(id))
                            {
                                throw new CategoryAlreadyExistsException("Category already exists");
                            }
                        });

        category.setName(request.getName());
        category.setDescription((request.getDescription()));

        Category updatedCategory = categoryRepository.save(category);

        return mapToResponse(updatedCategory);
    }

    @Override
    public void deactivateCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        category.setActive(false);
        categoryRepository.save(category);
    }

    @Override
    public void activateCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        category.setActive(true);
        categoryRepository.save(category);
    }

    private CategoryResponse mapToResponse(Category category)
    {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .active(category.getActive())
                .build();
    }
}
