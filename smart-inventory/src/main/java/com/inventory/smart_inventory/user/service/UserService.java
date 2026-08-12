package com.inventory.smart_inventory.user.service;

import com.inventory.smart_inventory.user.dto.*;

import java.util.List;

public interface UserService {

    UserResponse createEmployee(CreateUserRequest request);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse updateUser(Long id, UpdateUserRequest request);
    void deactivateUser(Long id);
    void activateUser(Long id);

    ProfileResponse getMyProfile(String email);
    ProfileResponse updateMyProfile(String email, UpdateProfileRequest request);
    void changePassword(String email, ChangePasswordRequest request);
}
