package com.inventory.smart_inventory.notification.service;

import com.inventory.smart_inventory.notification.dto.NotificationResponse;
import com.inventory.smart_inventory.product.entity.Product;
import com.inventory.smart_inventory.user.entity.User;

import java.util.List;

public interface NotificationService {

    void createBulkOrderNotification(User employee, Product product, Integer quantity);

    List<NotificationResponse> getMyNotifications(User user);

    long getUnreadCount(User user);

    void markAsRead(Long notificationId, User user);

    void markAllAsRead(User user);
}