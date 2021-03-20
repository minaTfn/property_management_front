import axios from "axios";

let baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'http://property.local/api/' : 'http://property.local/api/';

const request = axios.create({
    baseURL: baseUrl,
});

const token = localStorage.getItem('token');

if (token) {
    request.defaults.headers.common.Authorization = `Bearer ${token}`;
} else {
    delete request.defaults.headers.common.Authorization;
}


export default {
    auth: {
        login: (credentials) => request.post('/accounts/token/', credentials).then(response => response.data),
        register: (params) => request.post('/accounts/register/', params).then(response => response.data),
    }
}