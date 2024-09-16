const yup = require('yup');

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

module.exports = {
    tenantIdSchema,
    hostSchema,
    searchTenantsSchema,
    createTenantSchema,
    updateTenantSchema,
    updateTenantAccessSchema
};
