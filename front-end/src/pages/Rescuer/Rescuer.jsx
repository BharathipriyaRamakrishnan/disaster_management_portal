import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Rescuer.css';

const Rescuer = () => {
  const navigate = useNavigate();
  // Sample data for resource requests and incidents
  const resourceRequests = [
    { type: 'Water Supply', count: 12 },
    { type: 'Medical Aid', count: 15 },
    { type: 'Food Supply', count: 8 },
    { type: 'Evacuation Assistance', count: 10 },
  ];

  const incidents = [
    { title: 'Flood Rescue', date: '10-09-2024', location: 'Riverbank Area', description: 'Rescued 12 stranded individuals.' },
    { title: 'Earthquake Evacuation', date: '02-09-2024', location: 'Downtown City', description: 'Helped evacuate 30 citizens.' },
    { title: 'Wildfire Containment', date: '20-08-2024', location: 'Mountain Range', description: 'Supported firefighting team.' },
    { title: 'Building Collapse Aid', date: '12-08-2024', location: 'Main Street', description: 'Assisted in the search and rescue.' },
  ];

  const notifications = [
    { message: 'New water supply request received.', date: '10-09-2024' },
    { message: 'Community meeting scheduled for 12-09-2024.', date: '09-09-2024' },
    { message: 'Volunteers needed for evacuation assistance.', date: '08-09-2024' },
  ];

  const handleLogout = () => {
    // Implement logout logic (if any), then redirect to login page
    alert("Logged out successfully!"); // Optional alert
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Rescuer Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="dashboard-body">
        <div className="sidebar-res">
          <h2>Menu</h2>
          <ul>
            <li><a href="#notification-box">Notifications</a></li>
            <li><a href="#resource-requests">Resource Requests</a></li>
            <li><a href="#incident-tracker">Incident Tracker</a></li>
            <li><a href="#feedback">Feedback</a></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="notification-box" id="notification-box">
            <h2>Latest Notifications</h2>
            {notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <p>{notification.message}</p>
                <span>{notification.date}</span>
              </div>
            ))}
          </div>
          <div className="resource-requests" id="resource-requests">
            <h2>Total Resource Requests</h2>
            <ul>
              {resourceRequests.map((request, index) => (
                <li key={index}>
                  {request.type}: {request.count}
                </li>
              ))}
            </ul>
          </div>
          <div className="incident-tracker" id="incident-tracker">
            <h2>Incident Tracker</h2>
            <table>
              <thead>
                <tr>
                  <th>Incident Title</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident, index) => (
                  <tr key={index}>
                    <td>{incident.title}</td>
                    <td>{incident.date}</td>
                    <td>{incident.location}</td>
                    <td>{incident.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="feedback-form" id="feedback">
            <h2>Feedback</h2>
            <form>
              <textarea placeholder="Your feedback..." required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className="dashboard-footer">
        <p>&copy; 2024 Disaster Management Portal. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Rescuer;