import { api } from './client';
import { Credentials } from '../types';


// Auth service 

export const login = async (credentials: Credentials) => api.post('/auth/login', credentials);


