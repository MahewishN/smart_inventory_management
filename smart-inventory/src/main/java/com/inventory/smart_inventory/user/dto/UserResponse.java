package com.inventory.smart_inventory.user.dto;


import com.inventory.smart_inventory.user.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String branch;
    private Boolean active;
}
