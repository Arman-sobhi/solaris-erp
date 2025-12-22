const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    // In the future, this will connect to the backend
    // const response = await fetch(`${BASE_URL}${endpoint}`);
    // return response.json();
    console.log(`[API] GET request to ${endpoint}`);
    return Promise.resolve({} as T);
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    console.log(`[API] POST request to ${endpoint}`, data);
    return Promise.resolve({} as T);
  },
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    console.log(`[API] PUT request to ${endpoint}`, data);
    return Promise.resolve({} as T);
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    console.log(`[API] DELETE request to ${endpoint}`);
    return Promise.resolve({} as T);
  },
};
