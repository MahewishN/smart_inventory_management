package com.inventory.smart_inventory.transaction.service;

import com.inventory.smart_inventory.transaction.dto.CreateTransactionRequest;
import com.inventory.smart_inventory.transaction.dto.TransactionResponse;

import java.util.List;

public interface TransactionService {

    TransactionResponse createTransaction(CreateTransactionRequest request);

    List<TransactionResponse> getAllTransactions();

    TransactionResponse getTransactionById(Long id);
}
