import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import './AdminrescuerManagement.css';

function AdminRescuerManagement() {
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  const [editingRescuerId, setEditingRescuerId] = useState(null);
  const [rescuerData, setRescuerData] = useState([]);
  const [filteredRescuers, setFilteredRescuers] = useState([]);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
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
      const response = await fetch(`${BASE_URL}/rescuers`);
      const data = await response.json();
      setRescuerData(data);
      setFilteredRescuers(data); // Initialize the filteredRescuers with all data
    } catch (error) {
      console.error('Error fetching rescuers:', error);
    }
  };

  useEffect(() => {
    fetchRescuers();
  }, []);

  // Filter rescuer data based on the search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredRescuers(rescuerData);
    } else {
      const filtered = rescuerData.filter((rescuer) =>
        rescuer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRescuers(filtered);
    }
  }, [searchTerm, rescuerData]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      const response = await fetch(`${BASE_URL}/rescuers`, {
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

    const response = await fetch(`${BASE_URL}/rescuers/${editingRescuerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Rescuer updated successfully!');
      setRescuerData((prevData) => 
        prevData.map((rescuer) =>
          rescuer._id === editingRescuerId ? { ...rescuer, ...formData } : rescuer
        )
      );
    
      setEditingRescuerId(null);
      setFormData({
        name: '',
        mobile: '',
        location: '',
        field: '',
        password: '',
      });
    } else {
      alert('Error updating rescuer');
    }
  };

  const handleDelete = async (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this rescuer?')) {
      try {
        const response = await fetch(`${BASE_URL}pi/rescuers/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Rescuer deleted successfully!');
          fetchRescuers(); // Refetch the rescuers to update the list
        } else {
          alert('Error deleting rescuer');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error deleting rescuer');
      }
    }
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
            value={searchTerm}
            onChange={handleSearchChange} // Handle search input change
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
              {filteredRescuers.slice(0, 5).map((rescuer) => (
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
                onClick={() => setEditingRescuerId(null)}
              >
                &times;
              </span>
              <h3>Edit Rescuer</h3>
              {error && <p className="error">{error}</p>}
              <form onSubmit={handleUpdate}>
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
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button type="submit" className="save-btn">
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminRescuerManagement;

