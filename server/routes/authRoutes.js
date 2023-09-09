const router = require("express").Router();
const authCtrl = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../middleware/validChecks");
const { isUserExist } = require("../middleware/isUserExist");
const { protect } = require("../middleware/protect");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);

module.exports = router;
