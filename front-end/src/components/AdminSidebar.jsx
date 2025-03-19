import React from 'react';
import './AdminSidebar.css';
//import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  //const navigate = useNavigate();

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="/AdminDashboard" className="sidebar-link">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/AdminrescuerManagement" className="sidebar-link">
            Rescuer Management
          </a>
        </li>
        <li>
          <a href="/AdminBlogs" className="sidebar-link">
            Blogs
          </a>
        </li>
        <li>
          <a href="/AdminReports" className="sidebar-link">
            Reports
          </a>
        </li>
        <li>
          <a href="/login" className="sidebar-link">
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
