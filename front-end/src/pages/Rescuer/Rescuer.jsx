// import React, { useEffect, useState } from 'react';
// import './Rescuer.css';
// import { useNavigate } from 'react-router-dom';

// const RescuerDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [requests, setRequests] = useState([]);
//   const navigate = useNavigate();
//   // Fetch disaster reports
//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/report');
//         if (!response.ok) {
//           throw new Error('Failed to fetch reports');
//         }
//         const data = await response.json();
//         setReports(data);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };
//     fetchReports();
//   }, []);

//   // Fetch resource requests
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/request');
//         if (!response.ok) {
//           throw new Error('Failed to fetch requests');
//         }
//         const data = await response.json();
//         setRequests(data);
//       } catch (error) {
//         console.error('Error fetching requests:', error);
//       }
//     };
//     fetchRequests();
//   }, []);

//   const handleLogout = () => {
//     navigate("/login");
//     // Add logout logic here
//   };

//   return (
//     <div className="dashboard-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <h2 className="sidebar-title">Rescuer Dashboard</h2>
//         <ul className="sidebar-menu">
//           <li><a href="#reports">Disaster Reports</a></li>
//           <li><a href="#requests">Resource Requests</a></li>
//         </ul>
//         <button className="logout-button" onClick={handleLogout}>
//           Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Summary Section */}
//         <div className="summary-section">
//           <div className="summary-card">
//             <h3>Total Reports</h3>
//             <p>{reports.length}</p>
//           </div>
//           <div className="summary-card">
//             <h3>Total Requests</h3>
//             <p>{requests.length}</p>
//           </div>
//           <div className="summary-card">
//             <h3>Pending Reports</h3>
//             <p>{reports.filter((r) => !r.resolved).length}</p>
//           </div>
//           <div className="summary-card">
//             <h3>Completed Requests</h3>
//             <p>{requests.filter((r) => r.completed).length}</p>
//           </div>
//         </div>

//         {/* Disaster Reports Section */}
//         <div id="reports" className="section">
//           <h2>Disaster Reports</h2>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Type</th>
//                 <th>Description</th>
//                 <th>Location</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.length > 0 ? (
//                 reports.map((report, index) => (
//                   <tr key={index}>
//                     <td>{report.disasterType}</td>
//                     <td>{report.description}</td>
//                     <td>
//                       {report.location.latitude}, {report.location.longitude}
//                     </td>
//                     <td>{new Date(report.date).toLocaleString()}</td>
//                     <td>{report.resolved ? 'Resolved' : 'Pending'}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5">No reports available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Resource Requests Section */}
//         <div id="requests" className="section">
//           <h2>Resource Requests</h2>
//           <table className="data-table">
//             <thead>
//               <tr>
//                 <th>Description</th>
//                 <th>Location</th>
//                 <th>Date</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.length > 0 ? (
//                 requests.map((request, index) => (
//                   <tr key={index}>
//                     <td>{request.description}</td>
//                     <td>
//                       {request.location.latitude}, {request.location.longitude}
//                     </td>
//                     <td>{new Date(request.date).toLocaleString()}</td>
//                     <td>{request.completed ? 'Completed' : 'Pending'}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4">No resource requests available.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RescuerDashboard;

import React, { useEffect, useState } from 'react';
import './Rescuer.css';
import { useNavigate } from 'react-router-dom';

const RescuerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_SERVER_URL;

  // Fetch disaster reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${BASE_URL}/report`);
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  // Fetch resource requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`{BASE_URL}/request`);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  

  const handleCompleteReport = async (id) => {
    try {
      await fetch(`${BASE_URL}/report/${id}/complete`, {
        method: 'PUT',
      });
      setReports(reports.map((r) => (r._id === id ? { ...r, resolved: true } : r)));
    } catch (error) {
      console.error('Error completing report:', error);
    }
  };

  

  const handleCompleteRequest = async (id) => {
    try {
      await fetch(`${BASE_URL}/request/${id}/complete`, {
        method: 'PUT',
      });
      setRequests(requests.map((r) => (r._id === id ? { ...r, completed: true } : r)));
    } catch (error) {
      console.error('Error completing request:', error);
    }
  };
  
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Rescuer Dashboard</h2>
        <ul className="sidebar-menu">
          <li><a href="#reports">Disaster Reports</a></li>
          <li><a href="#requests">Resource Requests</a></li>
        </ul>
        <button className="logout-button" onClick={() => navigate('/login')}>Logout</button>
      </aside>

      <div className="main-content">
        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-card"><h3>Total Reports</h3><p>{reports.length}</p></div>
          <div className="summary-card"><h3>Total Requests</h3><p>{requests.length}</p></div>
          <div className="summary-card"><h3>Pending Reports</h3><p>{reports.filter(r => !r.resolved).length}</p></div>
          <div className="summary-card"><h3>Pending Requests</h3><p>{requests.filter(r => !r.completed).length}</p></div>
        </div>

        {/* Disaster Reports Table */}
        <div id="reports" className="section">
          <h2>Disaster Reports</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th><th>Description</th><th>Location</th><th>Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.disasterType}</td>
                  <td>{report.description}</td>
                  <td>{report.location.latitude}, {report.location.longitude}</td>
                  <td>{new Date(report.date).toLocaleString()}</td>
                  <td>{report.resolved ? 'Resolved' : 'Pending'}</td>
                  <td>
                    {!report.resolved && (
                      <button onClick={() => handleCompleteReport(report._id)}>✅</button> 
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resource Requests Table */}
        <div id="requests" className="section">
          <h2>Resource Requests</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Description</th><th>Location</th><th>Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td>{request.description}</td>
                  <td>{request.location.latitude}, {request.location.longitude}</td>
                  <td>{new Date(request.date).toLocaleString()}</td>
                  <td>{request.completed ? 'Completed' : 'Pending'}</td>
                  <td>
                    {!request.completed && (
                      <button onClick={() => handleCompleteRequest(request._id)}>✅</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RescuerDashboard;

