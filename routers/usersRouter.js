const express = require("express");
const usersRouter = express.Router();
const { getUserByUsername } = require("../controllers/users.controller");

usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
