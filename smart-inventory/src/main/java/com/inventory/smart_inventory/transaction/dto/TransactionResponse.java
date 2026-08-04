package com.inventory.smart_inventory.transaction.dto;

import com.inventory.smart_inventory.transaction.entity.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TransactionResponse {

    private Long id;
    private Long productId;
    private String productName;

    private TransactionType transactionType;
    private Integer quantity;

    private Long userId;
    private String userName;

    private String remarks;
    private LocalDateTime transactionDate;
}
