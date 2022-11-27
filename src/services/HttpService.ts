import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8800',
});

export default http;
