const express = require("express");
const {
  accessChat,
  fetchChats,
} = require("../controllers/chatControllers");
//const { protect } = require("../middleware/authMiddleware");
const { verifyToken } = require("../middleware");

const router = express.Router();

router.route("/").post(verifyToken, accessChat);
router.route("/").get(verifyToken, fetchChats);

module.exports = router;
