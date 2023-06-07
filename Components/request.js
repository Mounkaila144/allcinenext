import axios from 'axios';
import url from "./global";
import jwt_decode from "jwt-decode";

const MyRequest = async (route, method = 'GET', data = null, headers = {}) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const token=user["token"]
    var decoded = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000; // Obtenez le temps actuel en secondes
    if (decoded.exp < currentTime) {
        localStorage.clear()
        window.location.reload();
    } else {
          return axios({
            method:method,
            data:data,
            baseURL:`${url}/api/${route}` ,
            headers: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },
        });
    }
};

export default MyRequest;
