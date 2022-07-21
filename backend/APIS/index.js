const express = require("express");
const router = express.Router();

const authAPI = require("./auth");

// auth api [Login, Register]
router.use("/auth", authAPI);

module.exports = router;
