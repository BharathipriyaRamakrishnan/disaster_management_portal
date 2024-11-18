import React, { useState, useEffect } from 'react';
import './Admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons';
import PieChart from '../../components/PieChart';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const openOverlay = () => {
    setOverlayOpen(true);
    setDropdownOpen(false);
  };

  const closeOverlay = () => {
    setOverlayOpen(false);
  };

  const handleLogout = () => {
    alert("Logged out successfully!"); 
    navigate('/login');
  };

  const handleOutsideClick = (event) => {
    const dropdown = document.querySelector('.dropdown-menu');
    const profileButton = document.querySelector('.profile-btn');

    if (
      dropdownOpen &&
      dropdown &&
      !dropdown.contains(event.target) &&
      !profileButton.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Disaster Management Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li>Dashboard</li>
          <li>Community</li>
          <li>Reports</li>
          <li>User Management</li>
          <button className="lbtn" onClick={handleLogout}>Logout</button>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <div className="search-bar">
            <input type="text" placeholder="Search for..." />
          </div>
          <div className="profile-menu">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <FontAwesomeIcon icon={faBell} className="icon" />
            <button className="profile-btn" onClick={toggleDropdown}>
              <span className="profile-circle">A</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p onClick={openOverlay}>Change Password</p>
              </div>
            )}
          </div>
        </nav>

        {/* Password Overlay */}
        {overlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <span className="close" onClick={closeOverlay}>&times;</span>
              <h3>Change Password</h3>
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Repeat Password" />
              <button>Save Changes</button>
            </div>
          </div>
        )}

        {/* Dashboard Overview */}
        <div className="dashboard-overview">
          <div className="summary-card">
            <h3>Total Rescuers</h3>
            <p>150</p>
          </div>
          <div className="summary-card">
            <h3>Active Requests</h3>
            <p>25</p>
          </div>
          <div className="summary-card">
            <h3>Completed Rescues</h3>
            <p>120</p>
          </div>
          <div className="summary-card">
            <h3>Pending</h3>
            <p>10</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-section">
          <div className="chart">
           <PieChart/>
          </div>
          <div className="chart">
            <h4>Portal usage</h4>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
