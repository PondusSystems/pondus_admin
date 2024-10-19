const express = require('express');
const UserRoutes = require('./userRoutes');
const TenantRoutes = require('./tenantRoutes');

const router = express.Router();

// Set up routes
router.use('/user', UserRoutes);
router.use('/tenant', TenantRoutes);

module.exports = router;