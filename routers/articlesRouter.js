const express = require("express");
const articlesRouter = express.Router();
const {
  getArticleById,
  updateVotesById,
  addComment,
  getAllCommentsById,
  getAllArticles,
} = require("../controllers/articles.controller");

articlesRouter.get("/", getAllArticles);

articlesRouter.route("/:article_id").get(getArticleById).patch(updateVotesById);

articlesRouter
  .route("/:article_id/comments")
  .post(addComment)
  .get(getAllCommentsById);

module.exports = articlesRouter;
