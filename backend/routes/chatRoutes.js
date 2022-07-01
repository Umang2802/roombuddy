const express = require("express");
const {
  accessChat,
  fetchChats,
} = require("../controllers/chatControllers");
//const { protect } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware");

const router = express.Router();

router.route("/access").post(verifyToken, accessChat);
router.route("/fetch").post(verifyToken, fetchChats);

module.exports = router;
