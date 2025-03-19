// import React, { useState, useEffect } from "react";
// import AdminSidebar from "./AdminSidebar";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import "./AdminDashboard.css";

// const AdminDashboard = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/report/total-reports")
//       .then((res) => res.json())
//       .then((result) => setData(result))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="admin-dashboard-container">
//       <AdminSidebar />
//       <div className="dashboard-content">
//         <h2>Emergency Response</h2>

//         <h3>Total Reports Over Time</h3>
//         <LineChart
//           width={800}
//           height={300}
//           data={data}
//           margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="total" stroke="#82ca9d" name="Total Reports" />
//         </LineChart>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const [graphData, setGraphData] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    totalRequests: 0,
    totalDonations: 0,
    totalRescuers: 0,
  });

  useEffect(() => {
    // Fetch graph data
    fetch("http://localhost:5000/api/report/total-reports")
      .then((res) => res.json())
      .then((result) => setGraphData(result))
      .catch((error) => console.error("Error fetching graph data:", error));

    // Fetch stats for cards
    Promise.all([
      fetch(`${BASE_URL}/report/dashboard-stats`).then((res) => res.json()),
      fetch(`${BASE_URL}/request/dashboard-stats`).then((res) => res.json()),
      fetch(`${BASE_URL}/donations/dashboard-stat`).then((res) => res.json()),
      fetch(`${BASE_URL}/rescuers/dashboard-stats`).then((res) => res.json()),
    ])
      .then(([reports, requests, donations, rescuers]) => {
        setStats({
          totalReports: reports.totalReports,
          totalRequests: requests.totalRequests,
          totalDonations: donations.totalDonations,
          totalRescuers: rescuers.totalRescuers,
        });
      })
      .catch((error) => console.error("Error fetching stats:", error));
  }, []);

  return (
    <div className="admin-dashboard-container">
      <AdminSidebar />
      <div className="dashboard-content">
        <h2>Emergency Response Dashboard</h2>
        
        {/* Stats Cards */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h4>Total Reports</h4>
            <p>{stats.totalReports}</p>
          </div>
          <div className="stat-card">
            <h4>Total Requests</h4>
            <p>{stats.totalRequests}</p>
          </div>
          <div className="stat-card">
            <h4>Total Donations</h4>
            <p>{stats.totalDonations}</p>
          </div>
          <div className="stat-card">
            <h4>Total Rescuers</h4>
            <p>{stats.totalRescuers}</p>
          </div>
        </div>

        {/* Line Graph */}
        <h3>Total Reports Over Time</h3>
        <LineChart
          width={800}
          height={300}
          data={graphData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#82ca9d" name="Total Reports" />
        </LineChart>
      </div>
    </div>
  );
};

export default AdminDashboard;
