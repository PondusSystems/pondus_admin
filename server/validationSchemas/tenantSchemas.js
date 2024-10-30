const yup = require('yup');
const mongodb = require('mongodb');

const ObjectId = yup.string().test('is-valid', 'Invalid admin Id', value => mongodb.ObjectId.isValid(value));

const tenantIdSchema = yup.object().shape({
    tenantId: yup.string().trim().required('Tenant Id is required')
});

const hostSchema = yup.object().shape({
    host: yup.string().trim().required('Host name is required')
});

const searchTenantsSchema = yup.object().shape({
    pageIndex: yup.number().required('Page index is required'),
    limit: yup.number().positive('Limit must be positive').required('Limit is required'),
    searchQuery: yup.string().trim(),
});

const stripeSchema = yup.object().shape({
    apiKey: yup.string().trim().required('Stripe API Key is required'),
    webhookKey: yup.string().trim().required('Stripe Webhook Key is required')
});

const nodemailerSchema = yup.object().shape({
    service: yup.string().trim().required('Nodemailer service is required'),
    senderEmail: yup.string().email('Invalid email format').required('Sender email is required'),
    senderPassword: yup.string().trim().required('Sender password is required')
});

const configSchema = yup.object().shape({
    dbURI: yup.string().trim().required('Database URI is required'),
    host: yup.string().trim().required('Host name is required'),
    stripe: stripeSchema,
    nodemailer: nodemailerSchema
});

const createTenantSchema = yup.object().shape({
    companyName: yup.string().trim().required('Company Name is required'),
    tenantId: yup.string().trim().required('Tenant Id is required'),
    config: configSchema
});

const updateTenantSchema = yup.object().shape({
    companyName: yup.string().trim(),
    tenantId: yup.string().trim(),
    config: configSchema
});

const updateTenantAccessSchema = yup.object().shape({
    status: yup.string().trim().required('Status is required')
});

const updateCompanyInfoSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    address: yup.string().trim().required('Address is required'),
    city: yup.string().trim().required('City is required'),
    zip: yup.string().trim().required('Zip is required'),
    type: yup.string().trim().oneOf(['Studio', 'Traditional Gym', 'Health Club', 'Non-profit', 'Other'], 'Invalid type').required('Type is required'),
    logo: yup.string().trim().required('Logo is required')
});

const addAdminSchema = yup.object().shape({
    name: yup.string().trim().required('Name is required'),
    email: yup.string().email('Invalid email address').trim().required('Email is required'),
    number: yup.string().trim().required('Number is required'),
    dateOfBirth: yup.string().trim().required('Date of birth is required'),
    address: yup.string().trim().required('Address is required'),
    city: yup.string().trim().required('City is required'),
    zip: yup.string().trim().required('Zip is required'),
    password: yup.string().trim().required('Password is required')
});

const deleteAdminSchema = yup.object().shape({
    tenantId: yup.string().trim().required('Tenant Id is required'),
    adminId: ObjectId.required('Admin Id is required')
});

module.exports = {
    tenantIdSchema,
    hostSchema,
    searchTenantsSchema,
    createTenantSchema,
    updateTenantSchema,
    updateTenantAccessSchema,
    updateCompanyInfoSchema,
    addAdminSchema,
    deleteAdminSchema
};
