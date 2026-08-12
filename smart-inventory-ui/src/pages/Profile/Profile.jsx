import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Shield,
    Building2,
    Lock,
    Save,
    Eye,
    EyeOff,
} from "lucide-react";

import {
    getMyProfile,
    updateMyProfile,
    changePassword,
} from "../../services/userService";

function Profile() {

    const [profile, setProfile] = useState(null);

    const [fullName, setFullName] = useState("");
    const [branch, setBranch] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(true);
    const [savingProfile, setSavingProfile] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const [profileMessage, setProfileMessage] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const [profileError, setProfileError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // ===============================
    // Load Profile
    // ===============================

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getMyProfile();

                setProfile(data);
                setFullName(data.fullName);
                setBranch(data.branch);

            } catch (error) {

                console.error("Failed to load profile:", error);

            } finally {

                setLoading(false);

            }
        };

        loadProfile();

    }, []);


    // ===============================
    // Update Profile
    // ===============================

    const handleProfileSubmit = async (e) => {

        e.preventDefault();

        setProfileMessage("");
        setProfileError("");

        if (!fullName.trim() || !branch.trim()) {
            setProfileError("Full name and branch are required.");
            return;
        }

        try {

            setSavingProfile(true);

            const updatedProfile = await updateMyProfile({
                fullName,
                branch,
            });

            setProfile(updatedProfile);

            setProfileMessage(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(error);

            setProfileError(
                error.response?.data?.message ||
                "Failed to update profile."
            );

        } finally {

            setSavingProfile(false);

        }
    };


    // ===============================
    // Change Password
    // ===============================

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError(
                "Please fill in all password fields."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError(
                "New passwords do not match."
            );
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError(
                "New password must contain at least 6 characters."
            );
            return;
        }

        try {

            setChangingPassword(true);

            await changePassword({
                currentPassword,
                newPassword,
            });

            setPasswordMessage(
                "Password changed successfully."
            );

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {

            console.error(error);

            setPasswordError(
                error.response?.data?.message ||
                "Failed to change password."
            );

        } finally {

            setChangingPassword(false);

        }
    };


    // ===============================
    // Loading
    // ===============================

    if (loading) {

        return (
            <div className="flex items-center justify-center min-h-[400px]">

                <p className="text-slate-500">
                    Loading profile...
                </p>

            </div>
        );
    }


    if (!profile) {

        return (
            <div className="flex items-center justify-center min-h-[400px]">

                <p className="text-red-500">
                    Unable to load profile.
                </p>

            </div>
        );
    }


    return (

        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold text-slate-800">
                    My Profile
                </h1>

                <p className="text-slate-500 mt-1">
                    Manage your account information and password.
                </p>

            </div>


            {/* Profile Information */}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">

                <div className="px-6 py-5 border-b border-slate-200">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                            <User
                                size={21}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-800">
                                Profile Information
                            </h2>

                            <p className="text-sm text-slate-500">
                                Update your personal information.
                            </p>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={handleProfileSubmit}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Full Name */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
                                />

                            </div>

                            <p className="text-xs text-slate-400 mt-1">
                                Email cannot be changed.
                            </p>

                        </div>


                        {/* Branch */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Branch
                            </label>

                            <div className="relative">

                                <Building2
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={branch}
                                    onChange={(e) =>
                                        setBranch(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>

                        </div>


                        {/* Role */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Role
                            </label>

                            <div className="relative">

                                <Shield
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={profile.role}
                                    disabled
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
                                />

                            </div>

                        </div>

                    </div>


                    {/* Messages */}

                    {profileError && (

                        <p className="mt-4 text-sm text-red-600">
                            {profileError}
                        </p>

                    )}

                    {profileMessage && (

                        <p className="mt-4 text-sm text-green-600">
                            {profileMessage}
                        </p>

                    )}


                    {/* Save */}

                    <div className="mt-6 flex justify-end">

                        <button
                            type="submit"
                            disabled={savingProfile}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >

                            <Save size={18} />

                            {savingProfile
                                ? "Saving..."
                                : "Save Changes"
                            }

                        </button>

                    </div>

                </form>

            </div>


            {/* Change Password */}

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">

                <div className="px-6 py-5 border-b border-slate-200">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">

                            <Lock
                                size={21}
                                className="text-purple-600"
                            />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-800">
                                Change Password
                            </h2>

                            <p className="text-sm text-slate-500">
                                Keep your account secure with a strong password.
                            </p>

                        </div>

                    </div>

                </div>


                <form
                    onSubmit={handlePasswordSubmit}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Current Password */}

                        <PasswordInput
                            label="Current Password"
                            value={currentPassword}
                            setValue={setCurrentPassword}
                            show={showCurrentPassword}
                            setShow={setShowCurrentPassword}
                        />


                        {/* New Password */}

                        <PasswordInput
                            label="New Password"
                            value={newPassword}
                            setValue={setNewPassword}
                            show={showNewPassword}
                            setShow={setShowNewPassword}
                        />


                        {/* Confirm Password */}

                        <PasswordInput
                            label="Confirm New Password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            show={showConfirmPassword}
                            setShow={setShowConfirmPassword}
                        />

                    </div>


                    {/* Messages */}

                    {passwordError && (

                        <p className="mt-4 text-sm text-red-600">
                            {passwordError}
                        </p>

                    )}

                    {passwordMessage && (

                        <p className="mt-4 text-sm text-green-600">
                            {passwordMessage}
                        </p>

                    )}


                    <div className="mt-6 flex justify-end">

                        <button
                            type="submit"
                            disabled={changingPassword}
                            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >

                            <Lock size={18} />

                            {changingPassword
                                ? "Changing..."
                                : "Change Password"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}


// ========================================
// Password Input Component
// ========================================

function PasswordInput({
    label,
    value,
    setValue,
    show,
    setShow,
}) {

    return (

        <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>

            <div className="relative">

                <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(e) =>
                        setValue(e.target.value)
                    }
                    className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >

                    {show
                        ? <EyeOff size={18} />
                        : <Eye size={18} />
                    }

                </button>

            </div>

        </div>
    );
}

export default Profile;