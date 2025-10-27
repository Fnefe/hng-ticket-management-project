import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, logout } from '../utils/storage';
import './Dashboard.css'; 

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const tickets = getTickets() || [];
    setStats({
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length,
    });
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="content-wrapper">
          <div className="header-content">
            <h1>TicketFlow Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="content-wrapper">
          <h2>Ticket Statistics</h2>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-box stat-total">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h3>{stats.total}</h3>
                <p>Total Tickets</p>
              </div>
            </div>

            <div className="stat-box stat-open">
              <div className="stat-icon">🟢</div>
              <div className="stat-info">
                <h3>{stats.open}</h3>
                <p>Open Tickets</p>
              </div>
            </div>

            <div className="stat-box stat-progress">
              <div className="stat-icon">🟡</div>
              <div className="stat-info">
                <h3>{stats.inProgress}</h3>
                <p>In Progress</p>
              </div>
            </div>

            <div className="stat-box stat-closed">
              <div className="stat-icon">⚫</div>
              <div className="stat-info">
                <h3>{stats.closed}</h3>
                <p>Resolved Tickets</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button onClick={() => navigate('/tickets')} className="btn btn-primary">
                Manage Tickets
              </button>
              <button onClick={() => navigate('/tickets')} className="btn btn-secondary">
                Create New Ticket
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <p>&copy; 2025 TicketFlow. Built for HNG Internship.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;