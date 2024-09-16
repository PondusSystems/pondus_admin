import axiosInstance from './axiosInstance';

const BASE_URL = '/api/tenant';

const tenantService = {
    searchTenants: async (query) => {
        try {
            const response = await axiosInstance.get(`${BASE_URL}/search-tenants`, { params: query });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default tenantService;
