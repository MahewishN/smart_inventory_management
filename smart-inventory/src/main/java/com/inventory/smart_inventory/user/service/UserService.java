package com.inventory.smart_inventory.user.service;

import com.inventory.smart_inventory.user.dto.CreateUserRequest;
import com.inventory.smart_inventory.user.dto.UpdateUserRequest;
import com.inventory.smart_inventory.user.dto.UserResponse;
import java.util.List;

public interface UserService {

    UserResponse createEmployee(CreateUserRequest request);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UpdateUserRequest request);
    void deactivateUser(Long id);
    void activateUser(Long id);
}
