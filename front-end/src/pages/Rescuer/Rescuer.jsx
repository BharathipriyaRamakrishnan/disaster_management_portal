import React, { useState, useEffect } from "react";
import "./Rescuer.css";

const RescuerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);

  // Fetch disaster reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/report");
        if (!response.ok) {
          throw new Error(`Error fetching reports: ${response.statusText}`);
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchReports();
  }, []);

  // Fetch resource requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/request");
        if (!response.ok) {
          throw new Error(`Error fetching requests: ${response.statusText}`);
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Rescuer Dashboard</h1>

      {/* Disaster Reports Section */}
      <section className="reports-section">
        <h2>Disaster Reports</h2>
        {reports.length === 0 ? (
          <p>No disaster reports available.</p>
        ) : (
          <ul className="report-list">
            {reports.map((report, index) => (
              <li key={index} className="report-item">
                <h3>{report.disasterType}</h3>
                <p>{report.description}</p>
                <p>
                  Location: Latitude {report.location.latitude}, Longitude{" "}
                  {report.location.longitude}
                </p>
                <p>Reported on: {new Date(report.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Resource Requests Section */}
      <section className="requests-section">
        <h2>Resource Requests</h2>
        {requests.length === 0 ? (
          <p>No resource requests available.</p>
        ) : (
          <ul className="request-list">
            {requests.map((request, index) => (
              <li key={index} className="request-item">
                <p>{request.description}</p>
                <p>
                  Location: Latitude {request.location.latitude}, Longitude{" "}
                  {request.location.longitude}
                </p>
                <p>Requested on: {new Date(request.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RescuerDashboard;