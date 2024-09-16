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
    },
    createTenant: async (payload) => {
        try {
            const response = await axiosInstance.post(`${BASE_URL}/create-tenant`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateTenant: async (tenantId, payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-tenant/${tenantId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteTenant: async (tenantId) => {
        try {
            const response = await axiosInstance.delete(`${BASE_URL}/delete-tenant/${tenantId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateTenantAccess: async (tenantId, payload) => {
        try {
            const response = await axiosInstance.patch(`${BASE_URL}/update-tenant-access/${tenantId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default tenantService;
