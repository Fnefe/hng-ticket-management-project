import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import { getTickets, addTicket, updateTicket, deleteTicket } from '../utils/storage';
import './TicketManagement.css';

function TicketManagement() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadTickets();
  }, [navigate]);

  const loadTickets = () => {
    setTickets(getTickets());
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.status) {
      newErrors.status = 'Status is required';
    }
    if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be open, in_progress, or closed';
    }
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    try {
      if (editingTicket) {
        updateTicket(editingTicket.id, formData);
        showToast('success', 'Ticket updated successfully!');
      } else {
        addTicket(formData);
        showToast('success', 'Ticket created successfully!');
      }

      resetForm();
      loadTickets();
    } catch (error) {
      showToast('error', 'Failed to save ticket. Please try again.');
    }
  };

  const handleEdit = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      title: ticket.title,
      description: ticket.description || '',
      status: ticket.status,
      priority: ticket.priority || 'medium'
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (ticket) => {
    setDeleteConfirm(ticket);
  };

  const confirmDelete = () => {
    try {
      deleteTicket(deleteConfirm.id);
      showToast('success', 'Ticket deleted successfully!');
      setDeleteConfirm(null);
      loadTickets();
    } catch (error) {
      showToast('error', 'Failed to delete ticket. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setEditingTicket(null);
    setShowForm(false);
    setErrors({});
  };

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-progress';
      case 'closed': return 'status-closed';
      default: return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'in_progress': return 'In Progress';
      case 'open': return 'Open';
      case 'closed': return 'Closed';
      default: return status;
    }
  };

  return (
    <div className="tickets-container">
      {/* Header */}
      <header className="tickets-header">
        <div className="content-wrapper">
          <div className="header-content">
            <div>
              <h1>Ticket Management</h1>
              <button 
                onClick={() => navigate('/dashboard')} 
                className="btn-back"
              >
                ← Back to Dashboard
              </button>
            </div>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="tickets-main">
        <div className="content-wrapper">
          {/* Create Button */}
          {!showForm && (
            <div className="create-section">
              <button 
                onClick={() => setShowForm(true)} 
                className="btn btn-primary btn-create"
              >
                + Create New Ticket
              </button>
            </div>
          )}

          {/* Ticket Form */}
          {showForm && (
            <div className="ticket-form-container">
              <div className="form-header">
                <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
                <button onClick={resetForm} className="btn-close">✕</button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Enter ticket title"
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={errors.description ? 'error' : ''}
                    placeholder="Enter ticket description (optional)"
                    rows="4"
                  />
                  {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status *</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={errors.status ? 'error' : ''}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && <span className="error-message">{errors.status}</span>}
                  </div>

                  <div className="form-group">
                    <label>Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingTicket ? 'Update Ticket' : 'Create Ticket'}
                  </button>
                  <button type="button" onClick={resetForm} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div className="tickets-list">
            <h2>All Tickets ({tickets.length})</h2>
            
            {tickets.length === 0 ? (
              <div className="empty-state">
                <p>No tickets yet. Create your first ticket to get started!</p>
              </div>
            ) : (
              <div className="tickets-grid">
                {tickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <h3>{ticket.title}</h3>
                      <span className={`status-badge ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </div>

                    {ticket.description && (
                      <p className="ticket-description">{ticket.description}</p>
                    )}

                    <div className="ticket-meta">
                      <span className={`priority priority-${ticket.priority || 'medium'}`}>
                        Priority: {ticket.priority || 'medium'}
                      </span>
                      <span className="ticket-date">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="ticket-actions">
                      <button 
                        onClick={() => handleEdit(ticket)} 
                        className="btn btn-edit"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(ticket)} 
                        className="btn btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{deleteConfirm.title}"?</p>
            <p className="warning">This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={confirmDelete} className="btn btn-danger">
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="content-wrapper">
          <p>&copy; 2025 TicketFlow. Built for HNG Internship.</p>
        </div>
      </footer>
    </div>
  );
}

export default TicketManagement;