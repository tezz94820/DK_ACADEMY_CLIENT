import axios from 'axios';

const IP_PORT = process.env.NODE_ENV === 'production' ? process.env.NODE_PROD_URL : 'http://localhost:5000'

const axiosClient = axios.create({
    baseURL: `${IP_PORT}/api/v1/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });


  export default axiosClient;