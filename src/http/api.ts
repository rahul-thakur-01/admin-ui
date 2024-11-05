import { api } from './client';
import { Credentials } from '../types';


// Auth service 

export const login = async (credentials: Credentials) => api.post('/auth/login', credentials);
export const self = async () => api.get('/auth/self');


