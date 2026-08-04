package com.inventory.smart_inventory.transaction.controller;

import com.inventory.smart_inventory.transaction.dto.CreateTransactionRequest;
import com.inventory.smart_inventory.transaction.dto.TransactionResponse;
import com.inventory.smart_inventory.transaction.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService)
    {
        this.transactionService = transactionService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(
            @Valid
            @RequestBody CreateTransactionRequest request)
    {
        return ResponseEntity.ok(transactionService.createTransaction(request));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getAllTransactions()
    {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponse> getTransactionById(@PathVariable Long id)
    {
        return ResponseEntity.ok(transactionService.getTransactionById(id));
    }

}
