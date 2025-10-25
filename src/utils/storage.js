const TICKETS_KEY = 'ticketapp_tickets';

export const getTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  return tickets ? JSON.parse(tickets) : [];
};

export const saveTickets = (tickets) => {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
};

export const addTicket = (ticket) => {
  const tickets = getTickets();
  const newTicket = {
    id: Date.now().toString(),
    ...ticket,
    createdAt: new Date().toISOString()
  };
  tickets.push(newTicket);
  saveTickets(tickets);
  return newTicket;
};

export const updateTicket = (id, updates) => {
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === id);
  if (index !== -1) {
    tickets[index] = { ...tickets[index], ...updates };
    saveTickets(tickets);
    return tickets[index];
  }
  return null;
};

export const deleteTicket = (id) => {
  const tickets = getTickets();
  const filtered = tickets.filter(t => t.id !== id);
  saveTickets(filtered);
};