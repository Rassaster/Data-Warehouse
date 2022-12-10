import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6376f1b181a568fc250892b3.mockapi.io/',
});

export default api;
