package com.inventory.smart_inventory.transaction.repository;

import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.transaction.entity.InventoryTransaction;
import com.inventory.smart_inventory.transaction.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends JpaRepository<InventoryTransaction, Long> {

    List<InventoryTransaction> findByTransactionType(TransactionType transactionType);

    List<InventoryTransaction> findByProductAndTransactionTypeAndTransactionDateBetween(
            Product product,
            TransactionType transactionType,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

}
