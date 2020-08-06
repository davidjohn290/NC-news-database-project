const express = require("express");
const topicsRouter = express.Router();
const { getAllTopics } = require("../controllers/topics.controller");
const { custom405Error } = require("../errors/errorHandling");

topicsRouter.route("/").get(getAllTopics).all(custom405Error);

module.exports = topicsRouter;
