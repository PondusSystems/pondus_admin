const express = require('express');
// const UserRoutes = require('./userRoutes');
const tenantRoutes = require('./tenantRoutes');

const router = express.Router();

// Set up routes
// router.use('/user', UserRoutes);
router.use('/tenant', tenantRoutes);

module.exports = router;