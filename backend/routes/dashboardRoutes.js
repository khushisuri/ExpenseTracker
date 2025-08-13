const express = require("express");
const { protect } = require("../middleware.js/authMiddleware");

const {getDashboardData} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/get",protect,getDashboardData)

module.exports = router