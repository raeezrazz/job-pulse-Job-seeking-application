import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

console.log( import.meta.env.VITE_ADMIN_SERVICE_API,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")

const adminClient = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_SERVICE_API,
    headers: {
        "Content-Type": "application/json",
    },
    // Ensures cookies are sent with each request
});



export default adminClient;
