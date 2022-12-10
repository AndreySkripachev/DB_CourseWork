import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8800',
  headers: {
    post: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

// eslint-disable-next-line promise/catch-or-return
// http.get('goods/qwe/12').then(console.log);

export default http;
