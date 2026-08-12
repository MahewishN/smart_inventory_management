package com.inventory.smart_inventory.notification.service.impl;

import com.inventory.smart_inventory.notification.dto.NotificationResponse;
import com.inventory.smart_inventory.notification.entity.Notification;
import com.inventory.smart_inventory.notification.entity.NotificationType;
import com.inventory.smart_inventory.notification.repository.NotificationRepository;
import com.inventory.smart_inventory.notification.service.NotificationService;
import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.user.entity.Role;
import com.inventory.smart_inventory.user.entity.User;
import com.inventory.smart_inventory.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private static final int BULK_ORDER_THRESHOLD = 20;

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void createBulkOrderNotification(User employee, Product product, Integer quantity)
    {
        if (quantity < BULK_ORDER_THRESHOLD) {
            return;
        }

        List<User> admins = userRepository.findByRole(Role.ADMIN);

        String title = "Bulk Order Alert";

        String message = employee.getFullName() + " recorded a bulk sale of " + quantity
                        + " units of " + product.getName() + ".";

        for (User admin : admins)
        {
            Notification notification = Notification.builder()
                    .recipient(admin)
                    .sender(employee)
                    .title(title)
                    .message(message)
                    .type(NotificationType.BULK_ORDER)
                    .isRead(false)
                    .build();

            notificationRepository.save(notification);
        }
    }

    @Override
    public List<NotificationResponse> getMyNotifications(User user) {

        return notificationRepository
                .findByRecipientOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public long getUnreadCount(User user) {

        return notificationRepository
                .countByRecipientAndIsReadFalse(user);
    }

    @Override
    @Transactional
    public void markAsRead(Long notificationId, User user) {

        Notification notification = notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new EntityNotFoundException("Notification not found"));

        if (!notification.getRecipient().getId().equals(user.getId())) {
            throw new SecurityException("You cannot modify this notification");
        }

        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void markAllAsRead(User user) {

        List<Notification> notifications = notificationRepository.findByRecipientOrderByCreatedAtDesc(user);

        notifications.forEach(notification -> notification.setIsRead(true));

        notificationRepository.saveAll(notifications);
    }

    private NotificationResponse mapToResponse(Notification notification)
    {
        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .senderName(
                        notification.getSender().getFullName()
                )
                .createdAt(notification.getCreatedAt())
                .build();
    }
}