package com.inventory.smart_inventory.security.controller;

import com.inventory.smart_inventory.security.dto.LoginRequest;
import com.inventory.smart_inventory.security.dto.LoginResponse;
import com.inventory.smart_inventory.security.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    public AuthController(AuthenticationService authenticationService)
    {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid
            @RequestBody LoginRequest request)
    {
        return ResponseEntity.ok(authenticationService.login(request));
    }
}
