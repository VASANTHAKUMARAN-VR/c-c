

import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaRegEdit, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

const CompanyPage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile">
          <img
            src={user.profileImage || "https://th.bing.com/th/id/OIP.F977i9e7dMrznvOT8q8azgHaEf?w=302&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"}
            alt={user.name}
            className="profile-img"
          />
          <h3>{user.name || "Company Name"}</h3>
          <p>{user.email || "company@example.com"}</p>
        </div>
        <nav>
        <li>
    <FaTachometerAlt /> Dashboard
  </li>
  <li onClick={() => navigate("/post")}>
    <FaRegEdit /> Post Notice
  </li>
  <li onClick={() => navigate("/shortlist")}>
    <FaClipboardList /> Shortlist Students
  </li>
  <li onClick={() => { localStorage.clear(); navigate("/"); }}>
    <FaSignOutAlt /> Log Out
  </li>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome back, {user.name || "Company"}!</h1>
          <p>Here's what's happening with your career journey today.</p>
        </div>

        <div className="cards">
          <div className="card" onClick={() => navigate("/post")}>
            <div className="card-icon">📝</div>
            <div className="card-title">Post</div>
            <div className="card-description">Create internship notice</div>
            <div className="card-action">Go to Post Page</div>
          </div>

          <div className="card" onClick={() => navigate("/shortlist")}>
            <div className="card-icon">📋</div>
            <div className="card-title">Shortlist</div>
            <div className="card-description">Eligible students list</div>
            <div className="card-action">Go to Shortlist Page</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyPage;
