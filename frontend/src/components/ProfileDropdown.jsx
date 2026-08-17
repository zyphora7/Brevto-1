import React from "react";
import { useAuth } from "../context/AuthContext";

const ProfileDropdown = ({ onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    onClose();
    await logout();
  };

  if (!user) return null;

  return (
    <div className="profile-popup">
      <div className="profile-info">
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email}</div>
      </div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
