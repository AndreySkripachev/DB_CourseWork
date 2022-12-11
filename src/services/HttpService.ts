import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8800',
  headers: {
    post: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

export default http;
