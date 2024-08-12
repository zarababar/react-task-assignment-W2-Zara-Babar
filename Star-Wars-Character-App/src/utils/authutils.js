export const getAuthToken = () => localStorage.getItem('authToken');
export const getUsername = () => localStorage.getItem('username');
export const isAuthenticated = () => !!getAuthToken();

export const setLoginAuth = (token, username) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('username', username);
};

export const removeAuthItems = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
};
