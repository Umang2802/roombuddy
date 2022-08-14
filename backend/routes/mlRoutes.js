const express = require("express");
const router = express.Router();
const mlModel = require("../controllers/mlModelController");
router.post("/", mlModel.mlmodelpredict);
module.exports = router;
