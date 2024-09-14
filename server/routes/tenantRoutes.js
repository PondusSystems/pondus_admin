const router = require("express").Router();
const controller = require("../controllers/tenantController");
// const authMiddleware = require("../middleware/authMiddleware");
const tenantSchemas = require('../validationSchemas/tenantSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/get-tenant-config/:tenantId",
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  controller.GetTenantConfig
);

router.get(
  "/get-tenant-id-by-host/:host",
  validationMiddleware.validateParams(tenantSchemas.hostSchema),
  controller.GetTenantIdByHost
);

module.exports = router;
