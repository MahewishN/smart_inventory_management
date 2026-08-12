package com.inventory.smart_inventory.notification.repository;

import com.inventory.smart_inventory.notification.entity.Notification;
import com.inventory.smart_inventory.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByRecipientOrderByCreatedAtDesc(User recipient);
    long countByRecipientAndIsReadFalse(User recipient);
}