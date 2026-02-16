import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

// Get auth token
const getToken = () => localStorage.getItem('token');

// Auth API
export const authAPI = {
  signup: (username: string, password: string) =>
    axios.post(`${API_URL}/auth/signup`, { username, password }),
  
  signin: (username: string, password: string) =>
    axios.post(`${API_URL}/auth/signin`, { username, password }),
};

// Room API
export const roomAPI = {
  create: (name: string) =>
    axios.post(`${API_URL}/rooms`, { name }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  
  get: (id: number) =>
    axios.get(`${API_URL}/rooms/${id}`),
};

// Poll API
export const pollAPI = {
  create: (question: string, roomId: number, options: string[]) =>
    axios.post(`${API_URL}/polls`, { question, roomId, options }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  
  get: (id: number) =>
    axios.get(`${API_URL}/polls/${id}`),
  
  vote: (pollId: number, optionId: number) =>
    axios.post(`${API_URL}/polls/${pollId}/vote`, { optionId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
};
