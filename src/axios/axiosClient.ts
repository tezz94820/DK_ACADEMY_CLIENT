import axios from 'axios';


const axiosClient = axios.create({
    baseURL: `http://65.0.1.227:5000/api/v1/`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });


  export default axiosClient;