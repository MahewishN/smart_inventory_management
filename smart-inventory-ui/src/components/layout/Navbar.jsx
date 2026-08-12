import { useEffect, useRef, useState } from "react";
import { Bell, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import NotificationDropdown from "../notifications/NotificationDropdown";

import { getUnreadCount } from "../../services/notificationService";

function Navbar() {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const notificationRef = useRef(null);

    // Load unread count
    useEffect(() => {

        loadUnreadCount();

        const interval = setInterval(() => {
            loadUnreadCount();
        }, 30000);

        return () => clearInterval(interval);

    }, []);

    const loadUnreadCount = async () => {

        try {

            const count = await getUnreadCount();

            setUnreadCount(count);

        } catch (error) {

            console.error(
                "Failed to load unread notification count:",
                error
            );

        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    const handleNotificationToggle = () => {

        setShowNotifications((previous) => !previous);

    };

    return (

        <header
            className="
                flex
                items-center
                justify-between
                bg-white
                px-6
                py-4
                border-b
            "
        >

            {/* Left */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-sm text-slate-500">
                    Welcome back, {user?.fullName}
                </p>

            </div>


            {/* Right */}

            <div className="flex items-center gap-6">


                {/* Notifications */}

                <div
                    ref={notificationRef}
                    className="relative"
                >

                    <button
                        type="button"
                        onClick={handleNotificationToggle}
                        className="
                            relative
                            p-2
                            rounded-full
                            hover:bg-slate-100
                            transition
                        "
                    >

                        <Bell
                            size={22}
                            className={`
                                transition
                                ${
                                    showNotifications
                                        ? "text-blue-600"
                                        : "text-slate-600"
                                }
                            `}
                        />

                        {/* Unread indicator */}

                        {unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -top-0.5
                                    -right-0.5
                                    min-w-[18px]
                                    h-[18px]
                                    px-1
                                    flex
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    text-white
                                    text-[10px]
                                    font-bold
                                "
                            >
                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}
                            </span>

                        )}

                    </button>


                    {/* Dropdown */}

                    <NotificationDropdown
                        isOpen={showNotifications}
                        onClose={() =>
                            setShowNotifications(false)
                        }
                    />

                </div>


                {/* Profile */}

                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        px-3
                        py-2
                        hover:bg-slate-100
                        transition
                        text-left
                    "
                >

                    <UserCircle
                        size={42}
                        className="text-slate-600"
                    />

                    <div>

                        <h3 className="font-semibold text-slate-800">
                            {user?.fullName}
                        </h3>

                        <p className="text-sm text-slate-500">
                            {user?.role}
                        </p>

                    </div>

                </button>

            </div>

        </header>

    );
}

export default Navbar;