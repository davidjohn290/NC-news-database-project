const express = require("express");
const commentsRouter = express.Router();
const { custom405Error } = require("../errors/errorHandling");
const {
  getCommentById,
  removeCommentById,
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(getCommentById)
  .delete(removeCommentById)
  .all(custom405Error);

module.exports = commentsRouter;
