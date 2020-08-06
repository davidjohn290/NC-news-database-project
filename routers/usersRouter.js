const express = require("express");
const usersRouter = express.Router();
const { getUserByUsername } = require("../controllers/users.controller");
const { custom405Error } = require("../errors/errorHandling");

usersRouter.route("/:username").get(getUserByUsername).all(custom405Error);

module.exports = usersRouter;
