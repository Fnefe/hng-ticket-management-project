export const login = (email, password) => {

  if (email === 'user@test.com' && password === 'password123') {
    const token = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('ticketapp_session', token);
    return { success: true, token };
  }
  return { success: false, error: 'Invalid credentials' };
};

export const signup = (email, password, name) => {
  if (!email || !password || !name) {
    return { success: false, error: 'All fields are required' };
  }
  
  
  const token = 'mock-jwt-token-' + Date.now();
  localStorage.setItem('ticketapp_session', token);
  return { success: true, token };
};

export const logout = () => {
  localStorage.removeItem('ticketapp_session');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('ticketapp_session');
};