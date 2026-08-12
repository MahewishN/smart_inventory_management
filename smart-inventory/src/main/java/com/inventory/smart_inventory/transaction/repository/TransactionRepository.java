package com.inventory.smart_inventory.transaction.repository;

import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.transaction.entity.InventoryTransaction;
import com.inventory.smart_inventory.transaction.entity.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.smart_inventory.dashboard.dto.MonthlyPurchaseResponse;
import com.inventory.smart_inventory.dashboard.dto.MonthlySalesResponse;
import com.inventory.smart_inventory.dashboard.dto.TopSellingProductResponse;
import org.springframework.data.jpa.repository.Query;

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

    @Query(value = """
    SELECT 
        MONTHNAME(transaction_date) AS month,
        SUM(quantity) AS totalSales
    FROM inventory_transactions
    WHERE transaction_type = 'SALE'
    GROUP BY MONTH(transaction_date), MONTHNAME(transaction_date)
    ORDER BY MONTH(transaction_date)
    """, nativeQuery = true)
    List<Object[]> getMonthlySales();

    @Query(value = """
    SELECT 
        MONTHNAME(transaction_date) AS month,
        SUM(quantity) AS totalPurchase
    FROM inventory_transactions
    WHERE transaction_type = 'PURCHASE'
    GROUP BY MONTH(transaction_date), MONTHNAME(transaction_date)
    ORDER BY MONTH(transaction_date)
    """, nativeQuery = true)
    List<Object[]> getMonthlyPurchases();

    @Query("""
        SELECT new com.inventory.smart_inventory.dashboard.dto.TopSellingProductResponse(
            t.product.id,
            t.product.name,
            SUM(t.quantity)
        )
        FROM InventoryTransaction t
        WHERE t.transactionType = com.inventory.smart_inventory.transaction.entity.TransactionType.SALE
        GROUP BY t.product.id, t.product.name
        ORDER BY SUM(t.quantity) DESC
        """)
    List<TopSellingProductResponse> getTopSellingProducts();

}
