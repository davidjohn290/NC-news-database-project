const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  updateVotesById,
} = require("../controllers/articles.controller");

articlesRouter.route("/:article_id").get(getArticleById).patch(updateVotesById);

module.exports = articlesRouter;
