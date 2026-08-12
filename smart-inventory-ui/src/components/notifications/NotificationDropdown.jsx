import { useEffect, useState } from "react";
import {
    Bell,
    Check,
    CheckCheck,
    Package,
} from "lucide-react";

import {
    getMyNotifications,
    getUnreadCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
} from "../../services/notificationService";

function NotificationDropdown({ isOpen, onClose }) {

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Load notifications when dropdown opens
    useEffect(() => {

        if (!isOpen) {
            return;
        }

        loadNotifications();

    }, [isOpen]);

    const loadNotifications = async () => {

        try {

            setLoading(true);

            const [notificationData, count] = await Promise.all([
                getMyNotifications(),
                getUnreadCount(),
            ]);

            setNotifications(notificationData);
            setUnreadCount(count);

        } catch (error) {

            console.error(
                "Failed to load notifications:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    // Mark one notification as read
    const handleMarkAsRead = async (id) => {

        try {

            await markNotificationAsRead(id);

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === id
                        ? { ...notification, read: true }
                        : notification
                )
            );

            setUnreadCount((previous) =>
                Math.max(previous - 1, 0)
            );

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }
    };

    // Mark everything as read
    const handleMarkAllAsRead = async () => {

        try {

            await markAllNotificationsAsRead();

            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true,
                }))
            );

            setUnreadCount(0);

        } catch (error) {

            console.error(
                "Failed to mark all notifications as read:",
                error
            );

        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="
                absolute
                right-0
                top-12
                w-[380px]
                bg-white
                rounded-xl
                shadow-xl
                border
                border-slate-200
                z-50
                overflow-hidden
            "
        >

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b">

                <div className="flex items-center gap-2">

                    <Bell
                        size={19}
                        className="text-blue-600"
                    />

                    <h2 className="font-semibold text-slate-800">
                        Notifications
                    </h2>

                    {unreadCount > 0 && (
                        <span
                            className="
                                text-xs
                                bg-red-100
                                text-red-600
                                px-2
                                py-0.5
                                rounded-full
                                font-semibold
                            "
                        >
                            {unreadCount}
                        </span>
                    )}

                </div>

                {unreadCount > 0 && (
                    <button
                        type="button"
                        onClick={handleMarkAllAsRead}
                        className="
                            text-xs
                            text-blue-600
                            hover:text-blue-800
                            flex
                            items-center
                            gap-1
                        "
                    >
                        <CheckCheck size={15} />

                        Mark all read
                    </button>
                )}

            </div>

            {/* Notification List */}
            <div className="max-h-[400px] overflow-y-auto">

                {loading ? (

                    <div className="py-10 text-center text-slate-500 text-sm">
                        Loading notifications...
                    </div>

                ) : notifications.length === 0 ? (

                    <div className="py-10 text-center">

                        <Bell
                            size={35}
                            className="mx-auto text-slate-300 mb-3"
                        />

                        <p className="text-sm text-slate-500">
                            No notifications
                        </p>

                    </div>

                ) : (

                    notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className={`
                                px-5
                                py-4
                                border-b
                                last:border-b-0
                                transition
                                ${
                                    notification.read
                                        ? "bg-white"
                                        : "bg-blue-50"
                                }
                            `}
                        >

                            <div className="flex gap-3">

                                {/* Icon */}
                                <div
                                    className={`
                                        w-9
                                        h-9
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        shrink-0
                                        ${
                                            notification.read
                                                ? "bg-slate-100"
                                                : "bg-blue-100"
                                        }
                                    `}
                                >

                                    <Package
                                        size={18}
                                        className={
                                            notification.read
                                                ? "text-slate-500"
                                                : "text-blue-600"
                                        }
                                    />

                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">

                                    <div className="flex justify-between gap-2">

                                        <h3
                                            className={`
                                                text-sm
                                                ${
                                                    notification.read
                                                        ? "font-medium text-slate-700"
                                                        : "font-semibold text-slate-800"
                                                }
                                            `}
                                        >
                                            {notification.title ||
                                                notification.type ||
                                                "Notification"}
                                        </h3>

                                        {!notification.read && (
                                            <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0"></span>
                                        )}

                                    </div>

                                    <p className="text-sm text-slate-600 mt-1">
                                        {notification.message}
                                    </p>

                                    {notification.createdAt && (
                                        <p className="text-xs text-slate-400 mt-2">
                                            {new Date(
                                                notification.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    )}

                                    {!notification.read && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleMarkAsRead(
                                                    notification.id
                                                )
                                            }
                                            className="
                                                mt-2
                                                text-xs
                                                text-blue-600
                                                hover:text-blue-800
                                                flex
                                                items-center
                                                gap-1
                                            "
                                        >
                                            <Check size={14} />

                                            Mark as read
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>
    );
}

export default NotificationDropdown;