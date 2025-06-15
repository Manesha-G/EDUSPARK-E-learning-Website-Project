import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Check login status every 500ms
  useEffect(() => {
    const interval = setInterval(() => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedInUser(user);
    }, 500);

    return () => clearInterval(interval); // cleanup
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <span className="logo">EduSpark</span>
      </div>

      <div className="nav-right">
        <Link to="/">Home</Link>
        {!loggedInUser && <Link to="/signup">Sign Up</Link>}
        {!loggedInUser && <Link to="/login">Login</Link>}
        <Link to="/courses">Courses</Link>
        <Link to="/course-detail/1">Course Detail</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>

        {loggedInUser && (
          <div className="profile-section" onClick={toggleDropdown}>
            <div className="profile-icon">
              {loggedInUser.email.charAt(0).toUpperCase()}
            </div>

            {showDropdown && (
              <div
                className="profile-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <p><strong>User:</strong> {loggedInUser.username || loggedInUser.email}</p>
                <hr />
                <p><strong>Enrolled Courses:</strong></p>
                <ul>
                  {loggedInUser.enrolledCourses && loggedInUser.enrolledCourses.length > 0 ? (
                    loggedInUser.enrolledCourses.map((course, idx) => (
                      <li key={idx}>{course.title}</li>
                    ))
                  ) : (
                    <li>No courses enrolled</li>
                  )}
                </ul>
                <hr />
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
