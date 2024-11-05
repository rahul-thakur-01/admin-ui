import { api } from './client';
import { Credentials } from '../types';


// Auth service 

export const login = async (credentials: Credentials) => api.post('/auth/login', credentials);
export const self = async () => api.get('/auth/self');
export const logout = async () => api.post('/auth/logout');
export const getUsers = async () => api.get('/users');
export const getTenants = () => api.get('/tenants');


