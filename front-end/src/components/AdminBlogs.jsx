// import React from 'react'
// import AdminSidebar from './AdminSidebar'

// function AdminBlogs() {
//   return (
//     <>
//     <AdminSidebar/>
//     </>
//   )
// }

// export default AdminBlogs

import React, { useState, useEffect } from 'react';
import './AdminBlog.css';
import AdminSidebar from './AdminSidebar';


const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ image: '', title: '', description: '' });
  const BASE_URL = process.env.REACT_APP_SERVER_URL;
  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blogs`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  // Handle adding a blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', newBlog.image);
    formData.append('title', newBlog.title);
    formData.append('description', newBlog.description);

    try {
      const response = await fetch(`${BASE_URL}/blogs`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const addedBlog = await response.json();
        setBlogs([...blogs, addedBlog]);
        alert('Blog added successfully!');
        setNewBlog({ image: '', title: '', description: '' });
      }
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        alert('Blog deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <>
    <AdminSidebar/>
    <div className="admin-blog-page">
      <h1>Manage Blogs</h1>
      <form className="add-blog-form" onSubmit={handleAddBlog}>
        <label>
          Blog Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewBlog({ ...newBlog, image: e.target.files[0] })}
            required
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={newBlog.description}
            onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
            rows="4"
            required
          />
        </label>
        <button type="submit">Add Blog</button>
      </form>

      <div className="blog-list">
        <h2>Existing Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-item">
            <img src={blog.imageUrl} alt={blog.title} />
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <button onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AdminBlogs;
