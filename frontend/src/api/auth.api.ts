import api from './api';
import { saveToken } from './jwt';
import type {  LoginRequest, LoginResponse } from './types/auth.types';

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const payload: LoginRequest = { username, password };
  const response = await api.post<LoginResponse>('/login', payload);
  const { token } = response.data;
  saveToken(token);
  return response.data;
};