import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Ensures cookies are sent with each request
});

let isRefreshing = false;
let failedQueue: { resolve: (token: string | null) => void; reject: (error: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => apiClient(originalRequest))
                    .catch((err) => Promise.reject(err));
            }
            
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                
                const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/user/refresh-token`, {
                    withCredentials: true,
                });
                processQueue(null, data.newAccessToken);

                apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.newAccessToken}`;

                return apiClient(originalRequest); 
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error); 
    }
);

export default apiClient;
