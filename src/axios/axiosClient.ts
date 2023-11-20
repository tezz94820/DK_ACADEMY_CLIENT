import axios from 'axios';

// const IP_PORT = process.env.NODE_PROD_URL
const dev = "http://localhost:5000/api/v1/";
const prod = "https://api.dkacademy.co.in/api/v1/";

const baseURL = prod;

const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });

  export const axiosAuthClient  = axios.create({
    baseURL: baseURL,
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  export default axiosClient;