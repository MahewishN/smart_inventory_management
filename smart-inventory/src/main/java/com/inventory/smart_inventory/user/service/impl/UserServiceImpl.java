package com.inventory.smart_inventory.user.service.impl;

import com.inventory.smart_inventory.exception.EmailAlreadyExistsException;
import com.inventory.smart_inventory.exception.UserNotFoundException;
import com.inventory.smart_inventory.user.dto.CreateUserRequest;
import com.inventory.smart_inventory.user.dto.UpdateUserRequest;
import com.inventory.smart_inventory.user.dto.UserResponse;
import com.inventory.smart_inventory.user.entity.User;
import com.inventory.smart_inventory.user.repository.UserRepository;
import com.inventory.smart_inventory.user.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.inventory.smart_inventory.user.entity.Role;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder)
    {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserResponse createEmployee(CreateUserRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .branch(request.getBranch())
                .active(true)
                .build();

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findByRole(Role.EMPLOYEE)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

                user.setFullName(request.getFullName());
                user.setBranch(request.getBranch());
                user.setRole(request.getRole());
                user.setActive(request.getActive());

                User updatedUser = userRepository.save(user);
                return mapToResponse(updatedUser);
    }


    @Override
    public UserResponse getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return mapToResponse(user);
    }


    @Override
    public void deactivateUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));

        if (user.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin cannot be deactivated");
        }

        user.setActive(false);

        userRepository.save(user);
    }

    @Override
    public void activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException("User not found"));

        user.setActive(true);
        userRepository.save(user);
    }


    private UserResponse mapToResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .branch(user.getBranch())
                .active(user.getActive())
                .build();
    }
}
