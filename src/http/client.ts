import axios from 'axios';
import { useAuthStore } from '../store';

export const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const refreshToken = async () => {
    await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
        {},
        {
            withCredentials: true,
        }
    );
};

// const refreshToken = () => api.get('/auth/refresh');
// when we make this req refreshTokena at return originalRe which is on smae instance of axios will be called and it will be added to the headers of the original request and then the original request will be made again with the new token in the headers and the response will be returned to the original request
// interceptors -> intercept the request and response before they are handled by then or catch

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._isRetry) {
            try {
                originalRequest._isRetry = true;
                const headers = { ...originalRequest.headers };
                await refreshToken(); 
                return api.request({ ...originalRequest, headers });
            } catch (err) {
                console.error('Token refresh error', err);
                useAuthStore.getState().logout();
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);