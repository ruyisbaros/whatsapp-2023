const router = require("express").Router();
const authCtrl = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validChecks");
const { isUserExist } = require("../middleware/isUserExist");

router.post("/register", validateRegister, isUserExist, authCtrl.register);
router.post("/login", validateLogin, authCtrl.login);
router.get("/logout", authCtrl.logout);
router.get("/refresh_token", authCtrl.refreshToken);

module.exports = router;
