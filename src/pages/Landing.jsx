import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';  // ADD THIS LINE

function Landing() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="decorative-circle circle-1"></div>
        <div className="content-wrapper">
          <h1>TicketFlow</h1>
          <p>Manage your support tickets seamlessly across teams</p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/signup" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
        {/* Wave SVG at bottom */}
        <div className="wave-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#6366f1" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="content-wrapper">
          <div className="decorative-circle circle-2"></div>
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-box">
              <h3>Create Tickets</h3>
              <p>Quickly create and assign support tickets</p>
            </div>
            <div className="feature-box">
              <h3>Track Progress</h3>
              <p>Monitor ticket status in real-time</p>
            </div>
            <div className="feature-box">
              <h3>Team Collaboration</h3>
              <p>Work together to resolve issues faster</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <p>&copy; 2025 TicketFlow. Built for HNG Internship.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;