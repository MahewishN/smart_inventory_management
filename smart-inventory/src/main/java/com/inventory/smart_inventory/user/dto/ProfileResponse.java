package com.inventory.smart_inventory.user.dto;

import com.inventory.smart_inventory.user.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class ProfileResponse {
    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String branch;
}
