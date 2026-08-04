package com.inventory.smart_inventory.transaction.entity;


import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="inventory_transactions")
public class InventoryTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="product_id", nullable = false)
    private Product product;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType transactionType;

    @Column(nullable = false)
    private Integer quantity;

    @ManyToOne
    @JoinColumn(name="performed_by", nullable = false)
    private User performedBy;

    private String remarks;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime transactionDate;
}
