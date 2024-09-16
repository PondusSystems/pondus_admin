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

module.exports = {
    tenantIdSchema,
    hostSchema,
    searchTenantsSchema
};
