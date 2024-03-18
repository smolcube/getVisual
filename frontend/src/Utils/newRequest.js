
import axios from "axios";

const newRequest = axios.create({
    baseURL : 'http://localhost:5000/getVisual', 
    withCredentials:true,
    timeout: 10000,
});

export default newRequest;