import React, { useState } from 'react';
import './Donation.css';
import paymnet from '../assets/images/payment.png';

const DonationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    transactionId: '',
    amount: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axios.post('http://localhost:5000/api/donations', formData);
      setMessage(response.data.message);
      // Clear the form
      setFormData({
        name: '',
        number: '',
        email: '',
        transactionId: '',
        amount: '',
      });
    } catch (error) {
      setMessage('Error submitting the form. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="donation-form-container">
      <h2>Donate and Submit Details</h2>
      <div className="qr-code">
        <p>Scan the QR Code below to complete the payment:</p>
        <img src={paymnet} alt="QR Code" style={{ width: '180px', height: '180px' }} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className='lab'>Full Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className='inp'
          />
        </div>
        <div className="form-group">
          <label className='lab'>Phone Number*</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            className='inp'
          />
        </div>
        <div className="form-group">
          <label className='lab'>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className='inp'
          />
        </div>
        <div className="form-group">
          <label className='lab'>Amount Paid*</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            className='inp'
          />
        </div>
        <div className="form-group">
          <label className='lab'>Transaction ID*</label>
          <input
            type="text"
            name="transactionId"
            value={formData.transactionId}
            onChange={handleChange}
            required
            className='inp'
          />
        </div>
        <button type="submit" className='pay'>Submit</button>
      </form>
      {message && <p className="messagedn">{message}</p>}
    </div>
  );
};

export default DonationForm;