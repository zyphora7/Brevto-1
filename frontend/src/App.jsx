import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import CreateBlogModal from "./components/CreateBlogModal";

const AppContent = () => {
  const { user, loading } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [blogError, setBlogError] = useState("");
  
  // Modals and drop-downs state
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Appends new blog to the top of the list instantly
  const handleBlogCreated = (newBlog) => {
    setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
  };

  if (loading) {
    return (
      <div className="state-container" style={{ minHeight: "100vh" }}>
        <div className="spinner"></div>
        <div className="state-title">Loading Application</div>
        <p className="state-desc">Restoring your session. Please wait...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar
        onAddBlogClick={() => setIsAddBlogOpen(true)}
        isProfileOpen={isProfileOpen}
        setIsProfileOpen={setIsProfileOpen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              blogs={blogs}
              setBlogs={setBlogs}
              loadingBlogs={loadingBlogs}
              setLoadingBlogs={setLoadingBlogs}
              blogError={blogError}
              setBlogError={setBlogError}
            />
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Create Blog Modal popup */}
      {isAddBlogOpen && user && (
        <CreateBlogModal
          onClose={() => setIsAddBlogOpen(false)}
          onBlogCreated={handleBlogCreated}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
