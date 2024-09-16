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
  "/search-tenants",
  validationMiddleware.validateQuery(tenantSchemas.searchTenantsSchema),
  controller.SearchTenants
);

module.exports = router;
