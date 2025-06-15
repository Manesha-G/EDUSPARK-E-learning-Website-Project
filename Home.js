import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to EduSpark</h1>
        <p>Your Gateway to Smart Learning</p>
        <Link to="/courses" className="explore-btn">Explore Courses</Link>
      </div>

      <div className="features-section">
        <h2>Why Choose EduSpark?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with real-world experience.</p>
          </div>
          <div className="feature-card">
            <h3>Flexible Learning</h3>
            <p>Access your courses anytime, anywhere, and learn at your pace.</p>
          </div>
          <div className="feature-card">
            <h3>Hands-on Projects</h3>
            <p>Build real applications to strengthen your understanding.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Learning?</h2>
        <Link to="/signup" className="cta-btn">Join Now</Link>
      </div>
    </div>
  );
}

export default Home;

