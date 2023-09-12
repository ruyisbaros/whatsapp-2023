const router = require("express").Router();
const { protect } = require("../middleware/protect");
const messageCtrl = require("../controllers/messageController");

router.post("/send", protect, messageCtrl.send_create_message);
router.post("/get_messages/:convId", protect, messageCtrl.get_messages);
module.exports = router;
