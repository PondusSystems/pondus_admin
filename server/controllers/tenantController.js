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

const GetTenantIdByHost = async (req, res, next) => {
    try {
        const { host } = req.params;
        const tenantId = await tenantService.getTenantIdByHost(host);
        res.status(200).json({ tenantId });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    GetTenantConfig,
    GetTenantIdByHost
};
