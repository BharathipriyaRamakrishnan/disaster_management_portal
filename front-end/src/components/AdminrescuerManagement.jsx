import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminRescuerManagement.css';

function AdminRescuerManagement() {
  const [editingRescuerId, setEditingRescuerId] = useState(null);
  const [rescuerData, setRescuerData] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    field: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Fetch rescuers from the database
  const fetchRescuers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/rescuers');
      const data = await response.json();
      setRescuerData(data);
    } catch (error) {
      console.error('Error fetching rescuers:', error);
    }
  };

  useEffect(() => {
    fetchRescuers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingRescuerId) {
        handleUpdate();
        return;
      }

    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/rescuers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Rescuer added successfully!');
        setOverlayOpen(false);
        setFormData({
          name: '',
          mobile: '',
          location: '',
          field: '',
          password: '',
          confirmPassword: '',
        });
        fetchRescuers();
      } else {
        alert('Error adding rescuer');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (id) => {
    // Fetch rescuer data when editing
    const rescuer = rescuerData.find((r) => r._id === id);
    if (rescuer) {
      setEditingRescuerId(id);
      setFormData({
        name: rescuer.name,
        mobile: rescuer.mobile,
        location: rescuer.location,
        field: rescuer.field,
        password: rescuer.password,
      });
    }
  };
  
  // Handle update rescuer
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!editingRescuerId) return;

    const response = await fetch(`http://localhost:5000/api/rescuers/${editingRescuerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Rescuer updated successfully!');
      setEditingRescuerId(null);
      setFormData({
        name: '',
        mobile: '',
        location: '',
        field: '',
        password: '',
      });
      // Refetch rescuers
      const updatedRescuers = await response.json();
      setRescuerData(updatedRescuers);
    } else {
      alert('Error updating rescuer');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="admin-rescuer-management">
      <AdminSidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2>Rescuer Management</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Search Rescuers..."
          />
          <button className="add-rescuer-btn" onClick={() => setOverlayOpen(true)}>
            Add Rescuer
          </button>
        </div>

        {/* Rescuers Table */}
        <div className="table-container">
          <table className="rescuer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Location</th>
                <th>Field</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rescuerData.slice(0, 5).map((rescuer) => (
                <tr key={rescuer._id}>
                  <td>{rescuer.name}</td>
                  <td>{rescuer.mobile}</td>
                  <td>{rescuer.location}</td>
                  <td>{rescuer.field}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(rescuer._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(rescuer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Rescuer Overlay */}
{overlayOpen && (
  <div className="unique-overlay">
    <div className="unique-overlay-box">
      <span
        className="close-overlay"
        onClick={() => setOverlayOpen(false)}
      >
        &times;
      </span>
      <h3>Add Rescuer</h3>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="field"
          placeholder="Field"
          value={formData.field}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Re-enter Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  </div>
)}
        {editingRescuerId && (
        <div className='unique-overlay'>
            <div className="unique-overlay-box">
            <span
                className="close-overlay"
                onClick={() => setEditingRescuerId(false)}
            >
                &times;
            </span>
          <h3>Edit Rescuer</h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="field"
              placeholder="Field"
              value={formData.field}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className='save-btn'>Update</button>
          </form>
          </div>
        </div>
      )}  
      </div>
    </div>
  );
}

export default AdminRescuerManagement;
