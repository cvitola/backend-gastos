const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();
//endPoint /api/spends
router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.post('/logout', authController.logoutUser)

module.exports = router;