import axios from "axios"

/* This code snippet is creating an Axios instance with specific configurations. */
// eslint-disable-next-line react-refresh/only-export-components
export default axios.create({
    baseURL : "http://192.168.10.19:9001/",
    // baseURL : import.meta.env.VITE_SERVER_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
      },
    
})