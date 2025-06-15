import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./CourseDetail.css";

const courseData = [
  {
    id: "1",
    title: "Web Development",
    duration: "6 Weeks",
    syllabus: [
      "HTML & CSS Fundamentals",
      "Responsive Web Design",
      "JavaScript Essentials",
      "DOM Manipulation",
      "Project Deployment",
    ],
    videos: [
      "https://www.youtube.com/embed/pQN-pnXPaVg",
      "https://www.youtube.com/embed/1Rs2ND1ryYc",
      "https://www.youtube.com/embed/PkZNo7MFNFg",
      "https://www.youtube.com/embed/0ik6X4DJKCc",
      "https://www.youtube.com/embed/QJ68eI1eWe0",
    ],
  },
  {
    id: "2",
    title: "Data Structures",
    duration: "8 Weeks",
    syllabus: [
      "Arrays & Linked Lists",
      "Stacks & Queues",
      "Trees & BSTs",
      "Graphs & BFS/DFS",
      "Sorting & Searching Algorithms",
    ],
    videos: [
      "https://www.youtube.com/embed/RBSGKlAvoiM",
      "https://www.youtube.com/embed/wjI1WNcIntg",
      "https://www.youtube.com/embed/oSWTXtMglKE",
      "https://www.youtube.com/embed/pcKY4hjDrxk",
      "https://www.youtube.com/embed/ZqLtKLhcLXY",
    ],
  },
  {
    id: "3",
    title: "Machine Learning",
    duration: "10 Weeks",
    syllabus: [
      "Linear Regression",
      "Classification Algorithms",
      "Unsupervised Learning",
      "Model Evaluation",
      "Deep Learning Intro",
    ],
    videos: [
      "https://www.youtube.com/embed/Gv9_4yMHFhI",
      "https://www.youtube.com/embed/pMU_OwKMYDk",
      "https://www.youtube.com/embed/Gt2z0ao8mfs",
      "https://www.youtube.com/embed/85dtiMz9tSo",
      "https://www.youtube.com/embed/tPYj3fFJGjk",
    ],
  },
  {
    id: "4",
    title: "React JS",
    duration: "6 Weeks",
    syllabus: [
      "JSX & Components",
      "State & Props",
      "Hooks & Effects",
      "React Router",
      "React Project",
    ],
    videos: [
      "https://www.youtube.com/embed/Ke90Tje7VS0",
      "https://www.youtube.com/embed/35lXWvCuM8o",
      "https://www.youtube.com/embed/6BozpmSjk-Y",
      "https://www.youtube.com/embed/Law7wfdg_ls",
      "https://www.youtube.com/embed/w7ejDZ8SWv8",
    ],
  },
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [watched, setWatched] = useState([]);
  const [certName, setCertName] = useState("");

  const course = courseData.find((c) => c.id === courseId);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const found = user.enrolledCourses?.find((c) => c.id === courseId);
      if (found) {
        setEnrolled(true);
        setWatched(found.watched || []);
      }
      setUser(user);
    }
  }, [courseId]);

  const handleEnroll = () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      alert("Please login to enroll.");
      navigate("/login");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) => {
      if (u.email === user.email) {
        const already = u.enrolledCourses?.find((c) => c.id === course.id);
        if (!already) {
          u.enrolledCourses = [...(u.enrolledCourses || []), { ...course, watched: [] }];
          localStorage.setItem("loggedInUser", JSON.stringify(u));
        }
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEnrolled(true);
    setWatched([]);
    alert("Enrollment successful!");
  };

  const handleVideoWatched = (index) => {
    if (!watched.includes(index)) {
      const newWatched = [...watched, index];
      setWatched(newWatched);

      const updatedUser = { ...user };
      updatedUser.enrolledCourses = updatedUser.enrolledCourses.map((c) =>
        c.id === courseId ? { ...c, watched: newWatched } : c
      );

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === user.email ? updatedUser : u
      );

      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  const handlePDFGenerate = () => {
    if (!certName.trim()) {
      alert("Please enter your name");
      return;
    }

    const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    doc.setDrawColor(0);
    doc.setLineWidth(3);
    doc.rect(20, 20, pageWidth - 40, pageHeight - 40);

    doc.setFont("times", "bold");
    doc.setFontSize(40);
    doc.text("Certificate of Completion", pageWidth / 2, 100, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(20);
    doc.text("This certificate is proudly presented to", pageWidth / 2, 160, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(30);
    doc.text(certName, pageWidth / 2, 210, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(20);
    doc.text("for successfully completing the course", pageWidth / 2, 250, { align: "center" });

    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.text(`"${course.title}"`, pageWidth / 2, 290, { align: "center" });

    const date = new Date().toLocaleDateString();
    doc.setFont("times", "italic");
    doc.setFontSize(16);
    doc.text(`Date: ${date}`, 60, pageHeight - 80);

    doc.setDrawColor(0);
    doc.line(pageWidth - 250, pageHeight - 100, pageWidth - 60, pageHeight - 100);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(18);
    doc.text("EduSpark", pageWidth - 155, pageHeight - 80, { align: "center" });

    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.text("Generated by EduSpark Learning Platform", pageWidth / 2, pageHeight - 40, { align: "center" });

    doc.save(`${certName}_Certificate.pdf`);
  };

  const progress = course?.videos.length
    ? Math.round((watched.length / course.videos.length) * 100)
    : 0;

  if (!course) {
    return <div className="course-detail-container">Course not found.</div>;
  }

  return (
    <div className="course-detail-container">
      <h2>{course.title}</h2>
      <p className="duration">Duration: {course.duration}</p>
      {enrolled && <p className="progress">Progress: {progress}%</p>}
      <h3>Syllabus</h3>
      <ul>
        {course.syllabus.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>

      {!enrolled ? (
        <button onClick={handleEnroll}>Enroll Now</button>
      ) : (
        <>
          <h3>Course Videos</h3>
          {course.videos.map((videoUrl, index) => (
            <div key={index} className="video-section">
              <iframe
                width="100%"
                height="315"
                src={videoUrl}
                title={`YouTube video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => handleVideoWatched(index)}
              ></iframe>
              <p>Status: {watched.includes(index) ? "✅ Watched" : "❌ Not Watched"}</p>
            </div>
          ))}

          <div className="certificate-section">
            <h3>Generate Certificate</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
            />
            <button onClick={handlePDFGenerate}>Download Certificate</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetail;
