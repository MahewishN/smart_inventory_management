package com.inventory.smart_inventory.security.service;

import com.inventory.smart_inventory.exception.UserNotFoundException;
import com.inventory.smart_inventory.security.dto.LoginRequest;
import com.inventory.smart_inventory.security.dto.LoginResponse;

import com.inventory.smart_inventory.security.jwt.JwtService;
import com.inventory.smart_inventory.user.entity.User;
import com.inventory.smart_inventory.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService
{
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            CustomUserDetailsService userDetailsService,
            JwtService jwtService,
            UserRepository userRepository)
    {

        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request)
    {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

        String token = jwtService.generateToken(userDetails);

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        return LoginResponse.builder()
                .token(token)
                .type("Bearer")
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }

}
