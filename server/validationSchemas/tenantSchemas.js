const yup = require('yup');

const tenantIdSchema = yup.object().shape({
    tenantId: yup.string().trim().required('Tenant Id is required')
});

const hostSchema = yup.object().shape({
    host: yup.string().trim().required('Host name is required')
});

module.exports = {
    tenantIdSchema,
    hostSchema
};
