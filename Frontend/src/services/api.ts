import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  console.log(response)
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  console.log(email, password)
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  console.log(response)
  console.log("Login request:", { email, password });
  return response.data;
};

export const getEventsForCurrentWeek = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/events?week=current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};