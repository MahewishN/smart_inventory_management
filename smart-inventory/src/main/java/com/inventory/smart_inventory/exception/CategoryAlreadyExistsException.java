package com.inventory.smart_inventory.exception;

public class CategoryAlreadyExistsException extends RuntimeException {

    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}