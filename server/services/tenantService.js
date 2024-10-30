const { MongoClient, ObjectId } = require('mongodb');
const Tenant = require('../models/tenantModel');
const authUtils = require('../utils/authUtils');
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

const searchTenants = async (pageIndex, limit, searchQuery) => {
  const skip = (pageIndex - 1) * limit;
  let query = {};
  if (searchQuery && searchQuery !== '') {
    query = {
      $or: [
        { companyName: { $regex: searchQuery, $options: 'i' } },
        { 'config.host': { $regex: searchQuery, $options: 'i' } },
      ]
    };
  }
  const totalCount = await Tenant.countDocuments(query);
  const totalPages = Math.ceil(totalCount / limit);
  const tenants = await Tenant.find(query)
    .sort({ createdAt: -1 })  // Sort by createdAt descending (-1)
    .skip(skip)
    .limit(limit);

  if (!tenants || tenants.length <= 0) {
    const error = new Error('Tenants not found!');
    error.code = 404;
    throw error;
  }

  return {
    tenants,
    totalPages,
    totalCount
  };
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

const getCompanyInfo = async (tenantId) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  const dbURI = tenant.config.dbURI;
  let companyInfo;
  let client;
  try {
    client = new MongoClient(dbURI);

    await client.connect();

    const database = client.db();
    const collection = database.collection('company-infos');
    companyInfo = await collection.findOne({});
  } catch (error) {
    console.log('Error: ', error);
    const newError = new Error('Error while fetching company info!');
    newError.code = 500;
    throw newError;
  } finally {
    if (client) {
      await client.close();
    }
  }
  // if (!companyInfo) {
  //   const newError = new Error('Company Info not found!');
  //   newError.code = 404;
  //   throw newError;
  // }
  return companyInfo || null;
};

const updateCompanyInfo = async (tenantId, updatedInfo) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  const dbURI = tenant.config.dbURI;
  let companyInfo;
  let client;
  try {
    client = new MongoClient(dbURI);

    await client.connect();

    const database = client.db();
    const collection = database.collection('company-infos');
    const existingCompanyInfo = await collection.findOne({});
    const now = new Date();
    const documentToUpdate = {
      ...updatedInfo,
      updatedAt: now,
      createdAt: existingCompanyInfo?.createdAt ? existingCompanyInfo.createdAt : now
    };
    companyInfo = await collection.findOneAndUpdate({}, { $set: documentToUpdate }, { returnDocument: 'after', upsert: true });
  } catch (error) {
    console.log('Error: ', error);
    const newError = new Error('Error while fetching company info!');
    newError.code = 500;
    throw newError;
  } finally {
    if (client) {
      await client.close();
    }
  }
  if (!companyInfo) {
    const newError = new Error('Company Info not found!');
    newError.code = 404;
    throw newError;
  }
  return companyInfo;
};

const getAllCompanyAdmins = async (tenantId) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  const dbURI = tenant.config.dbURI;
  let admins;
  let client;
  try {
    client = new MongoClient(dbURI);

    await client.connect();

    const database = client.db();
    const collection = database.collection('users');
    const adminProjection = {
      name: 1,
      email: 1,
      number: 1,
      dateOfBirth: 1,
      address: 1,
      city: 1,
      zip: 1
    }
    admins = await collection.find({ role: "admin" }, { projection: adminProjection }).toArray();
  } catch (error) {
    console.log('Error: ', error);
    const newError = new Error('Error while fetching admins!');
    newError.code = 500;
    throw newError;
  } finally {
    if (client) {
      await client.close();
    }
  }
  // if (!admins || admins.length <= 0) {
  //   const newError = new Error('Admins not found!');
  //   newError.code = 404;
  //   throw newError;
  // }
  return admins || [];
};

const addCompanyAdmin = async (tenantId, adminData) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  const dbURI = tenant.config.dbURI;
  let admin;
  let client;
  try {
    client = new MongoClient(dbURI);

    await client.connect();

    const database = client.db();
    const collection = database.collection('users');
    const existingUser = await collection.findOne({
      $or: [
        { email: adminData.email },
        { number: adminData.number }
      ]
    });
    if (existingUser) {
      const newError = new Error('User already exist with this email or number!');
      newError.code = 409;
      throw newError;
    }
    const passwordDigest = await authUtils.hashPassword(adminData.password);
    const now = new Date();
    const updatedAdminData = {
      ...adminData,
      password: passwordDigest,
      role: "admin",
      updatedAt: now,
      createdAt: now
    };
    admin = await collection.insertOne(updatedAdminData);
  } catch (error) {
    console.log('Error: ', error);
    if (error.message && error.code) {
      throw error
    } else {
      const newError = new Error('Error while creating admin!');
      newError.code = 500;
      throw newError;
    }
  } finally {
    if (client) {
      await client.close();
    }
  }
  if (!admin) {
    const newError = new Error('Unable to create admin!');
    newError.code = 400;
    throw newError;
  }
  return admin;
};

const deleteCompanyAdmin = async (tenantId, adminId) => {
  const tenant = await Tenant.findOne({ tenantId });
  if (!tenant) {
    const newError = new Error('Tenant not found!');
    newError.code = 404;
    throw newError;
  }
  const dbURI = tenant.config.dbURI;
  let deletedAdmin;
  let client;
  try {
    client = new MongoClient(dbURI);

    await client.connect();

    const database = client.db();
    const collection = database.collection('users');
    deletedAdmin = await collection.findOneAndDelete({ _id: ObjectId.createFromHexString(adminId) });
  } catch (error) {
    console.log('Error: ', error);
    const newError = new Error('Error while deleting admin!');
    newError.code = 500;
    throw newError;
  } finally {
    if (client) {
      await client.close();
    }
  }
  if (!deletedAdmin) {
    const newError = new Error('Admin not found!');
    newError.code = 404;
    throw newError;
  }
  return deletedAdmin;
};

module.exports = {
  getTenantConfig,
  searchTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  getTenantIdByHost,
  getCompanyInfo,
  updateCompanyInfo,
  getAllCompanyAdmins,
  addCompanyAdmin,
  deleteCompanyAdmin
};
