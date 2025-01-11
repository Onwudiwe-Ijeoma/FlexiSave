// export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const baseURL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
    login: `${baseURL}/login`,
    register: `${import.meta.env.VITE_API_URL}/auth/register`
  };
  

// Debug endpoints
console.log('Login endpoint:', API_ENDPOINTS.login) 


  