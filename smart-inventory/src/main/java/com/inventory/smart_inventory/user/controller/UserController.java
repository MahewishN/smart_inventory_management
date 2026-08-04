package com.inventory.smart_inventory.user.controller;


import com.inventory.smart_inventory.user.dto.CreateUserRequest;
import com.inventory.smart_inventory.user.dto.UpdateUserRequest;
import com.inventory.smart_inventory.user.dto.UserResponse;
import com.inventory.smart_inventory.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/users")

public class UserController {
    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }


    @PostMapping
    public ResponseEntity<UserResponse> createEmployee(
            @Valid
            @RequestBody CreateUserRequest request)
    {
        UserResponse response = userService.createEmployee(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers()
    {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @Valid
            @RequestBody UpdateUserRequest request)
    {
        return ResponseEntity.ok(userService.updateUser(id, request));
    }

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<String> deactivateUser(@PathVariable Long id)
    {
        userService.deactivateUser(id);
        return ResponseEntity.ok("User deactivated successfully");
    }

    @PatchMapping("/{id}/activate")
    public ResponseEntity<String> activateUser(@PathVariable Long id)
    {
        userService.activateUser(id);
        return ResponseEntity.ok("User activated successfully");
    }

}
