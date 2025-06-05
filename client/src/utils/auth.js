export const isLoggedIn = () => !!localStorage.getItem('token');

export const getToken = () => localStorage.getItem('token');

