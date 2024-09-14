const Tenant = require('../models/tenantModel');
const cryptoUtils = require('../utils/cryptoUtils');

const getTenantConfig = async (tenantId) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  else if (tenant.status !== 'enabled') {
    const newError = new Error('Tenant access blocked by admin!');
    newError.code = 403;
    throw newError;
  }
  const encryptedConfig = cryptoUtils.encryptData(JSON.stringify(tenant.config));
  return encryptedConfig;
};

const createTenant = async (tenantData) => {
  const existingTenant = await Tenant.findOne({ tenantId: tenantData.tenantId });
  if (existingTenant) {
    const newError = new Error('Tenant already exists!');
    newError.code = 400;
    throw newError;
  }

  const tenant = new Tenant(tenantData);
  await tenant.save();
  return tenant;
};

const updateTenant = async (tenantId, updateData) => {
  const tenant = await Tenant.findOneAndUpdate(
    { tenantId },
    { $set: updateData },
    { new: true }
  );
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }

  return tenant;
};

const deleteTenant = async (tenantId) => {
  const tenant = await Tenant.findOneAndDelete({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }

  return tenant;
};

const getTenantIdByHost = async (host) => {
  const tenant = await Tenant.findOne({ 'config.host': host });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  else if (tenant.status !== 'enabled') {
    const newError = new Error('Tenant access blocked by admin!');
    newError.code = 403;
    throw newError;
  }
  return tenant.tenantId;
};

const data = {
  companyName: "Gym Test2",
  tenantId: "example789",
  config: {
    host: "example2.com",
    dbURI: "mongodb+srv://shoaibfarooka:Welcome5home.@cluster0.hrpczac.mongodb.net/PondusTest?retryWrites=true&w=majority",
    stripe: {
      apiKey: "sk_test_51PhsS1L3hPHcFVDkxw05fkgpVxZjqKMPKxm3ZzfzJmKMWBibxuhaF7yrCT8SxljF7FcFbYOCXoVWOPYydlUMfXNw0011JFxYBU",
      webhookKey: "whsec_sLPa1EhUAnSjBJfQMPBD9pZ9WaHAn8Mn"
    },
    nodemailer: {
      service: "Gmail",
      senderEmail: "koalaartsig@gmail.com",
      senderPassword: "geyeifgiiuhepabj"
    }
  }
};

// createTenant(data);
// deleteTenant('example123');
module.exports = {
  getTenantConfig,
  createTenant,
  updateTenant,
  deleteTenant,
  getTenantIdByHost
};
