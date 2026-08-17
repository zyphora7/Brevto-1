const express = require("express");
const router = express.Router();
const { getCurrentUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getCurrentUserProfile);

module.exports = router;
