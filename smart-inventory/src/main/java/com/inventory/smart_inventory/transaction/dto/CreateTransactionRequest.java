package com.inventory.smart_inventory.transaction.dto;

import com.inventory.smart_inventory.transaction.entity.TransactionType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTransactionRequest {
    @NotNull(message = "Product is required")
    private Long productId;

    @NotNull(message = "Transaction type is required")
    private TransactionType transactionType;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "User is required")
    private Long userId;

    private String remarks;
}
