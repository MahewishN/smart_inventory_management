package com.inventory.smart_inventory.user.dto;


import com.inventory.smart_inventory.user.entity.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotNull(message = "Role is required")
    private Role role;

    @NotNull(message = "Active status is required")
    private Boolean active;
}
