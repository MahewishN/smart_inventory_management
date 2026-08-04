package com.inventory.smart_inventory.exception;

public class ProductAlreadyExistsException extends RuntimeException
{
    public ProductAlreadyExistsException(String message) {
        super(message);
    }
}
