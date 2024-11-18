import React, { useState, useEffect } from 'react';
import './Volunteer.css';
import disasterImage from '../../assets/images/hero.jpg';
import donation from '../../assets/images/donate.jpg';
import blog1 from '../../assets/images/blog1.jpg';
import blog2 from '../../assets/images/blog2.jpg';
import blog3 from '../../assets/images/blog3.jpg';
import { useNavigate } from 'react-router-dom';
import communityImage from '../../assets/images/communityImage.jpg'

const Volunteer = () => {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/report");
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
      }
    };
  
    fetchIncidents();
  }, []);


  const [showReportForm, setShowReportForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const handleReportClick = () => setShowReportForm(true);
  const handleRequestClick = () => setShowRequestForm(true);
  const handleDonateClick = () => {
    navigate('/payment');
  };
  const handleCloseModal = () => {
    setShowReportForm(false);
    setShowRequestForm(false);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const shareLocation = document.querySelector('input[name="location"]:checked').value;

    if (shareLocation === 'yes') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const formData = {
            disasterType: e.target.disasterType.value,
            description: e.target.description.value,
            location: { latitude, longitude },
            timestamp: new Date().toLocaleString(), 
          };
          setIncidents((prevIncidents) => [...prevIncidents, formData]);

          try {
            const response = await fetch('http://localhost:5000/api/report', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });

            if (response.ok) {
              alert('Report submitted successfully with live location!');
            } else {
              alert('Failed to submit report.');
            }
          } catch (error) {
            console.error('Error submitting report:', error);
            alert('An error occurred while submitting the report.');
          }
          handleCloseModal();
        }, (error) => {
          console.error('Geolocation error:', error);
          alert('Unable to retrieve your location.');
        });
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    } else {
      alert('Report not submitted without live location.');
      handleCloseModal();
    }
  };
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    alert('Request submitted!');
    handleCloseModal();
  };

  return (
    <div className="volunteer-page">
      <nav className="navbar">
        <div className="logo">HELPING HAND.</div>
        <ul className="nav-links">
          <li><a href="#home">HOME</a></li>
          <li><a href="#donate">DONATE</a></li>
          <li><a href="#blog">BLOG</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
        <div className="login-button">
          <a href="/login">LOGIN</a>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="home-section">
        <div className="home-content">
          <h1>"TOGETHER, WE REBUILD"</h1>
          <p>HELP US RECOVER FROM DISASTER</p>
          <div className="action-buttons">
            <button onClick={handleReportClick} className="report-btn">Report</button>
            <button onClick={handleRequestClick} className="request-btn">Request</button>
          </div>
        </div>
        <img src={disasterImage} alt="Disaster Relief" className="home-img" />
      </section>

      {/* Report Modal */}
      {showReportForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>&times;</button>
            <h2>Report an Incident</h2>
            <form onSubmit={handleFormSubmit} className="report-form">
              <div className="form-group">
                <label htmlFor="disasterType">Type of Disaster</label>
                <select id="disasterType" name="disasterType" required>
                  <option value="" disabled>Select a disaster</option>
                  <option value="Fire">Fire</option>
                  <option value="Earthquake">Earthquake</option>
                  <option value="Flood">Flood</option>
                  <option value="Landslide">Landslide</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Describe the Incident</label>
                <textarea id="description" name="description" rows="4" placeholder="Provide details..." required></textarea>
              </div>

              <div className="form-group">
                <label>Share Live Location?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="location" value="yes" required />
                    Yes
                  </label>
                  <label>
                    <input type="radio" name="location" value="no" required />
                    No
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn">Submit Report</button>
            </form>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {showRequestForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseModal}>&times;</button>
            <h2>Enter Your Request</h2>
            <form onSubmit={handleRequestSubmit} className="request-form">
              <div className="form-group">
                <label htmlFor="requestDescription">Describe Your Request</label>
                <textarea id="requestDescription" rows="4" placeholder="Provide details..." required></textarea>
              </div>
              <div className="form-group">
                <label>Share Live Location?</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="requestLocation" value="yes" required />
                    Yes
                  </label>
                  <label>
                    <input type="radio" name="requestLocation" value="no" required />
                    No
                  </label>
                </div>
              </div>
              <button type="submit" className="submit-btn">Submit Request</button>
            </form>
          </div>
        </div>
      )}

            {/* Community Section */}
            <section id="community" className="community-section">
        <div className="community-content">
          <h2>Community Incidents</h2>
          {incidents.length === 0 ? (
            <p>No incidents reported yet.</p>
          ) : (
            <ul className="incident-list">
              {incidents.map((incident, index) => (
                <li key={index} className="incident-item">
                  <h3>{incident.disasterType}</h3>
                  <p>{incident.description}</p>
                  <p>Location: {incident.location.latitude}, {incident.location.longitude}</p>
                  <p>Reported on: {incident.timestamp}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <img src={communityImage} alt="Community" className="community-image" />
      </section>
      
      {/* Donate Section */}
      <section id="donate" className="donate-section">
        <img src={donation} alt="Donation" className="donateimg" />
        <div className="donate-content">
          <h2>Donate for Disaster Relief</h2>
          <p>Your donations help us provide timely assistance to affected communities.</p>
          <button onClick={handleDonateClick} className="donate-btn">Donate Now</button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="latest-blog-section" id="blog">
        <h2>LATEST BLOG</h2>
        <div className="blog-cards">
          <div className="blog-card">
            <img src={blog1} alt="Blog 1" />
            <h3>"Braving the Wild: Rescuers Save Stranded Hikers from Remote Mountain Trail"</h3>
            <p>A group of hikers lost on a challenging mountain trail were safely rescued after a grueling 12-hour operation. Emergency crews navigated harsh terrain to reach them in time.</p>
            <button className="read-more-btn">Read More</button>
          </div>
          <div className="blog-card">
            <img src={blog2} alt="Blog 2" />
            <h3>"Disaster Averted: Quick Response to Raging Fire Prevents Devastation"</h3>
            <p>Flames engulfed a local business district, but thanks to swift firefighting efforts, major damage was averted. Emergency services worked through the night to bring the fire under control.</p>
            <button className="read-more-btn">Read More</button>
          </div>
          <div className="blog-card">
            <img src={blog3} alt="Blog 3" />
            <h3>"Earthquake Devastates Region: Rescue Teams Race Against Time to Save Lives"</h3>
            <p>A powerful earthquake has left dozens trapped under rubble, as rescue teams work tirelessly to pull survivors from collapsed buildings. Aid is being dispatched to the hardest-hit areas.</p>
            <button className="read-more-btn">Read More</button>
          </div>
        </div>
      </section>

      {/* Emergency Contacts Section */}
      <section className="emergency-contacts-section">
        <h2>Emergency Contacts</h2>
        <div className="emergency-numbers">
          <div className="emergency-item">
            <h3>Fire Department</h3>
            <p>Call: 101</p>
          </div>
          <div className="emergency-item">
            <h3>Police Department</h3>
            <p>Call: 100</p>
          </div>
          <div className="emergency-item">
            <h3>Medical Emergency</h3>
            <p>Call: 102</p>
          </div>
          <div className="emergency-item">
            <h3>Disaster Management Helpline</h3>
            <p>Call: 9711077372</p>
          </div>
          <div className="emergency-item">
            <h3>Ambulance</h3>
            <p>Call: 911 (in some regions)/ 108</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2>Share Your Thoughts</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="text" placeholder="Phone Number" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">HELPING HAND.</div>
          <ul className="footer-links">
            <li><a href="tel:+917604900996">+91 7604900996</a></li>
            <li><a href="mailto:developer@gmail.com">developer@gmail.com</a></li>
            <li><a href="#blog">helping_hand</a></li>
          </ul>
          <p className="footer-copyright">
            © 2024 Helping Hand. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Volunteer;
