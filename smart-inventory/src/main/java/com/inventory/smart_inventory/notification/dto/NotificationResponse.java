package com.inventory.smart_inventory.notification.dto;

import com.inventory.smart_inventory.notification.entity.NotificationType;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;
    private String title;
    private String message;
    private NotificationType type;
    private Boolean isRead;
    private String senderName;
    private LocalDateTime createdAt;
}
