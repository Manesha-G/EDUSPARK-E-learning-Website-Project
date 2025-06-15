import React from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

const courseData = [
  {
    id: "1",
    title: "Web Development",
    shortDescription: "Build stunning websites using HTML, CSS, and JavaScript.",
  },
  {
    id: "2",
    title: "Data Structures",
    shortDescription: "Understand and implement key data structures efficiently.",
  },
  {
    id: "3",
    title: "Python Programming",
    shortDescription: "Master Python with real-world coding challenges.",
  },
  {
    id: "4",
    title: "ReactJS Essentials",
    shortDescription: "Create interactive UIs with React components and hooks.",
  },
];

const Courses = () => {
  return (
    <div className="courses-container">
      <h1 className="courses-heading">Explore Our Courses</h1>
      <p className="courses-subheading">Enhance your skills with our curated content</p>
      <div className="card-grid">
        {courseData.map((course) => (
          <Link to={`/courses/${course.id}`} key={course.id} className="course-card">
            <div className="card-content">
              <h3>{course.title}</h3>
              <p>{course.shortDescription}</p>
              <span className="learn-more">Learn More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
