const router = require("express").Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const userSchemas = require('../validationSchemas/userSchemas');
const validateRequest = require('../middleware/validationMiddleware');

router.post(
  "/register",
  validateRequest(userSchemas.registerSchema),
  controller.Register
);
router.post(
  "/login",
  validateRequest(userSchemas.loginSchema),
  controller.Login
);
router.put(
  "/update-user-info",
  authMiddleware.stripToken,
  authMiddleware.verifyToken,
  validateRequest(userSchemas.updateUserInfoSchema),
  controller.UpdateUser
);

module.exports = router;
