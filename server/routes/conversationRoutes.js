const router = require("express").Router();
const { protect } = require("../middleware/protect");
const conversationCtrl = require("../controllers/conversationController");

router.post("/", protect, conversationCtrl.create_open);

module.exports = router;
