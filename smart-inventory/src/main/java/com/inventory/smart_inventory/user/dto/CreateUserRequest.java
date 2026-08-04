package com.inventory.smart_inventory.user.dto;


import com.inventory.smart_inventory.user.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateUserRequest {
    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min=8, message = "Password must be atleast 8 characters")
    private String password;

    @NotNull(message = "Role is required")
    private Role role;

    @NotBlank(message = "Branch is required")
    private String branch;
}
