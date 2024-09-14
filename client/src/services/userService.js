import axiosInstance from './axiosInstance';

const BASE_URL = '/api/user';

const userService = {
    loginUser: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/login`, payload, { withCredentials: true, skipAuthRefresh: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    registerUser: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/register`, payload, { withCredentials: true, skipAuthRefresh: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    refreshToken: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/refresh-token`, payload, { withCredentials: true, skipAuthRefresh: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    logoutUser: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/logout`, payload, { withCredentials: true });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getUserInfo: async () => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/fetch-user-info`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
