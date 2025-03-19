import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import bg from '../../assets/images/bg.jpg'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/'); // Adjust the path according to your routing setup
  };


    // Password visibility
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
  
    // Example validation for username and password
    if (username === 'rescuer' && password === 'rescuerpass') {
      // Redirect to the guide page upon successful login
      navigate('/rescuer');
    } else if (username === 'admin' && password === 'adminpass') {
      navigate('/admin'); // Redirect to admin page
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-section">
        <div className="logo">
          <h1>Helping Hand.</h1>
        </div>
        <div className="login-form">
          <h2>Welcome,</h2>
          <p>Disaster management portal</p>
          
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
            <div className="login-options">
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-btn">Sign in</button>
          </form>
        </div>
        <p className='return'>Return to <span onClick={returnHome} >home page</span></p>
      </div>
      <div className="image-section">
        <img src={bg} alt="Decorative background" />
      </div>
    </div>
  );
};

export default Login;
