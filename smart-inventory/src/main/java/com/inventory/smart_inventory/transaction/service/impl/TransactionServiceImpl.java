package com.inventory.smart_inventory.transaction.service.impl;


import com.inventory.smart_inventory.exception.InsufficientStockException;
import com.inventory.smart_inventory.exception.ProductNotFoundException;
import com.inventory.smart_inventory.exception.TransactionNotFoundException;
import com.inventory.smart_inventory.exception.UserNotFoundException;
import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.product.repository.ProductRepository;
import com.inventory.smart_inventory.transaction.dto.CreateTransactionRequest;
import com.inventory.smart_inventory.transaction.dto.TransactionResponse;
import com.inventory.smart_inventory.transaction.entity.InventoryTransaction;
import com.inventory.smart_inventory.transaction.entity.TransactionType;
import com.inventory.smart_inventory.transaction.repository.TransactionRepository;
import com.inventory.smart_inventory.transaction.service.TransactionService;
import com.inventory.smart_inventory.user.entity.User;
import com.inventory.smart_inventory.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.inventory.smart_inventory.notification.service.NotificationService;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public TransactionServiceImpl(TransactionRepository transactionRepository,
                                  ProductRepository productRepository,
                                  UserRepository userRepository,
                                  NotificationService notificationService)
    {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }


    @Override
    public TransactionResponse createTransaction(CreateTransactionRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(()->new ProductNotFoundException("Product not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(()->new UserNotFoundException("User not found"));

        if(request.getTransactionType() == TransactionType.PURCHASE)
        {
            product.setQuantity(product.getQuantity() + request.getQuantity());
        }
        else
        {
            if(product.getQuantity() < request.getQuantity())
            {
                throw new InsufficientStockException("Insufficient stock available");
            }
            product.setQuantity(product.getQuantity() - request.getQuantity());
        }

        productRepository.save(product);

        InventoryTransaction transaction = InventoryTransaction.builder()
                .product(product)
                .transactionType(request.getTransactionType())
                .quantity(request.getQuantity())
                .performedBy(user)
                .remarks(request.getRemarks())
                .build();

        InventoryTransaction savedTransaction = transactionRepository.save(transaction);

        if (request.getTransactionType() == TransactionType.SALE && request.getQuantity() >= 20)
        {
            notificationService.createBulkOrderNotification(user, product, request.getQuantity());
        }
        return mapToResponse(savedTransaction);
    }

    @Override
    public List<TransactionResponse> getAllTransactions() {
        return transactionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public TransactionResponse getTransactionById(Long id) {
        InventoryTransaction transaction = transactionRepository.findById(id)
                .orElseThrow(()->new TransactionNotFoundException("Transaction not found"));

        return mapToResponse(transaction);
    }

    private TransactionResponse mapToResponse(InventoryTransaction transaction)
    {
        return TransactionResponse.builder()
                .id(transaction.getId())
                .productId(transaction.getProduct().getId())
                .productName(transaction.getProduct().getName())
                .transactionType(transaction.getTransactionType())
                .quantity(transaction.getQuantity())
                .userId(transaction.getPerformedBy().getId())
                .userName(transaction.getPerformedBy().getFullName())
                .remarks(transaction.getRemarks())
                .transactionDate(transaction.getTransactionDate())
                .build();
    }
}
