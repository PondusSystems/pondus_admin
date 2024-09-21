const tenantService = require('../services/tenantService');

const GetTenantConfig = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        const config = await tenantService.getTenantConfig(tenantId);
        res.status(200).json({ config });
    } catch (error) {
        next(error);
    }
};

const SearchTenants = async (req, res, next) => {
    try {
        const { pageIndex, limit, searchQuery } = req.query;
        const parsedPageIndex = parseInt(pageIndex);
        const parsedLimit = parseInt(limit);
        const result = await tenantService.searchTenants(parsedPageIndex, parsedLimit, searchQuery);
        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

const CreateTenant = async (req, res, next) => {
    try {
        const data = { ...req.body };
        const tenant = await tenantService.createTenant(data);
        res.status(201).json({ message: "Tenant created successfully!" });
    } catch (error) {
        next(error)
    }
};

const UpdateTenant = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        const data = { ...req.body };
        await tenantService.updateTenant(tenantId, data);
        res.status(200).json({ message: 'Tenant updated successfully!' });
    } catch (error) {
        next(error);
    }
};

const DeleteTenant = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        await tenantService.deleteTenant(tenantId);
        res.status(200).json({ message: 'Tenant deleted successfully!' });
    } catch (error) {
        next(error);
    }
};

const GetTenantIdByHost = async (req, res, next) => {
    try {
        const { host } = req.params;
        const tenantId = await tenantService.getTenantIdByHost(host);
        res.status(200).json({ tenantId });
    } catch (error) {
        next(error);
    }
};

const GetCompanyInfo = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        const companyInfo = await tenantService.getCompanyInfo(tenantId);
        res.status(200).json({ companyInfo });
    } catch (error) {
        next(error);
    }
};

const UpdateCompanyInfo = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        const data = { ...req.body };
        await tenantService.updateCompanyInfo(tenantId, data);
        res.status(200).json("Info updated successfully!");
    } catch (error) {
        next(error);
    }
};

const GetAllAdmins = async (req, res, next) => {
    try {
        const { tenantId } = req.params;
        const admins = await tenantService.getAllAdmins(tenantId);
        res.status(200).json({ admins });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    GetTenantConfig,
    SearchTenants,
    CreateTenant,
    UpdateTenant,
    DeleteTenant,
    GetTenantIdByHost,
    GetCompanyInfo,
    UpdateCompanyInfo,
    GetAllAdmins
};
