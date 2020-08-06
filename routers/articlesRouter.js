const express = require("express");
const articlesRouter = express.Router();
const { custom405Error } = require("../errors/errorHandling");
const {
  getArticleById,
  updateVotesById,
  getAllCommentsById,
  getAllArticles,
} = require("../controllers/articles.controller");
const { addComment } = require("../controllers/comments.controller");

articlesRouter.route("/").get(getAllArticles).all(custom405Error);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(updateVotesById)
  .all(custom405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(addComment)
  .get(getAllCommentsById)
  .all(custom405Error);

module.exports = articlesRouter;
