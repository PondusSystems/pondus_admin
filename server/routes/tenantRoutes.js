const router = require("express").Router();
const controller = require("../controllers/tenantController");
const authMiddleware = require("../middleware/authMiddleware");
const tenantSchemas = require('../validationSchemas/tenantSchemas');
const validationMiddleware = require('../middleware/validationMiddleware');

router.get(
  "/get-tenant-config/:tenantId",
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  controller.GetTenantConfig
);

router.get(
  "/search-tenants",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateQuery(tenantSchemas.searchTenantsSchema),
  controller.SearchTenants
);

router.post(
  "/create-tenant",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateRequest(tenantSchemas.createTenantSchema),
  controller.CreateTenant
);

router.patch(
  "/update-tenant/:tenantId",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  validationMiddleware.validateRequest(tenantSchemas.updateTenantSchema),
  controller.UpdateTenant
);

router.delete(
  "/delete-tenant/:tenantId",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  controller.DeleteTenant
);

router.patch(
  "/update-tenant-access/:tenantId",
  authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  validationMiddleware.validateRequest(tenantSchemas.updateTenantAccessSchema),
  controller.UpdateTenant
);

router.get(
  "/get-tenant-id-by-host/:host",
  validationMiddleware.validateParams(tenantSchemas.hostSchema),
  controller.GetTenantIdByHost
);

router.get(
  "/get-company-info/:tenantId",
  // authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  controller.GetCompanyInfo
);

router.patch(
  "/update-company-info/:tenantId",
  // authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  validationMiddleware.validateRequest(tenantSchemas.updateCompanyInfoSchema),
  controller.UpdateCompanyInfo
);

router.get(
  "/get-all-admins/:tenantId",
  // authMiddleware.authenticateRequest,
  validationMiddleware.validateParams(tenantSchemas.tenantIdSchema),
  controller.GetAllAdmins
);

module.exports = router;
