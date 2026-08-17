import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = ({ onAddBlogClick, isProfileOpen, setIsProfileOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen, setIsProfileOpen]);

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          Brevto
          <span className="logo-dot"></span>
        </Link>

        <nav className="nav-links" ref={dropdownRef}>
          <Link to="/" className={`nav-link ${isActive("/")}`}>
            Home
          </Link>

          {user ? (
            <>
              {/* Add Blog Link / Icon Button */}
              <button onClick={onAddBlogClick} className="nav-btn">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Blog
              </button>

              {/* Profile Icon Trigger */}
              <div
                className="profile-trigger"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                title="View Profile"
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Profile Popup */}
              {isProfileOpen && (
                <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="nav-btn">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
