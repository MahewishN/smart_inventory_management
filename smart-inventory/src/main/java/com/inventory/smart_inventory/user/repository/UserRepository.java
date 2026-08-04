package com.inventory.smart_inventory.user.repository;

import com.inventory.smart_inventory.user.entity.Role;
import com.inventory.smart_inventory.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(Role role);

}
