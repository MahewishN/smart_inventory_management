package com.inventory.smart_inventory.security.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private String token;
    private String type;
    private Long userId;
    private String fullName;
    private String email;
    private String role;
}
