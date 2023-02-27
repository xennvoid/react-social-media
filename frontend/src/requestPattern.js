import axios from "axios"

export const sendRequest = axios.create({
    baseURL: 'http://localhost:5151/api/',
});

sendRequest.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers['x-access-token'] = token;
    return config;
});