const express = require("express");
const apiRouter = express.Router();
const topicsRouter = require("./topicsRouter");
const usersRouter = require("./usersRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const endpointsJSON = require("../controllers/endpoints.controller");
const { custom405Error } = require("../errors/errorHandling");

apiRouter.route("/").get(endpointsJSON).all(custom405Error);

apiRouter.use("/topics", topicsRouter);

apiRouter.use("/users", usersRouter);

apiRouter.use("/articles", articlesRouter);

apiRouter.use("/comments", commentsRouter);

module.exports = { apiRouter };
