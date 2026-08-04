package com.inventory.smart_inventory.exception;

public class InsufficientStockException extends RuntimeException{
    public InsufficientStockException(String message)
    {
        super(message);
    }
}
