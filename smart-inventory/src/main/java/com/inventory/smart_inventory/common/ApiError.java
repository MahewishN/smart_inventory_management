package com.inventory.smart_inventory.common;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiError {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
}