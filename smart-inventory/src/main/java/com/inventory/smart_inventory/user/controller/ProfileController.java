package com.inventory.smart_inventory.user.controller;

import com.inventory.smart_inventory.user.dto.ChangePasswordRequest;
import com.inventory.smart_inventory.user.dto.ProfileResponse;
import com.inventory.smart_inventory.user.dto.UpdateProfileRequest;
import com.inventory.smart_inventory.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;

    public ProfileController(UserService userService)
    {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<ProfileResponse> getMyProfile(Authentication authentication)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.getMyProfile(email));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PutMapping
    public ResponseEntity<ProfileResponse> updateMyProfile(Authentication authentication,
        @Valid @RequestBody UpdateProfileRequest request)
    {
        String email = authentication.getName();
        return ResponseEntity.ok(userService.updateMyProfile(email, request));
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(Authentication authentication,
                                                 @Valid @RequestBody ChangePasswordRequest request)
    {
        String email = authentication.getName();

        userService.changePassword(email, request);
        return ResponseEntity.ok("Password changed successfully");
    }
}
