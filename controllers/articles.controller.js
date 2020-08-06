const {
  fetchArticleById,
  patchVotesById,
  fetchAllCommentsById,
  fetchAllArticles,
} = require("../models/articles.model");

const getArticleById = (req, res, next) => {
  const { params } = req;
  fetchArticleById(params.article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
const updateVotesById = (req, res, next) => {
  const { params, body } = req;
  patchVotesById(params.article_id, body.inc_votes)
    .then((article) => {
      res.status(200).send({ updatedArticle: article });
    })
    .catch(next);
};
const getAllCommentsById = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { article_id } = req.params;
  fetchAllCommentsById(article_id, sort_by, order)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const getAllArticles = (req, res, next) => {
  const { sort_by, order_by } = req.query;
  const filter = req.query;
  fetchAllArticles(sort_by, order_by, filter)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

module.exports = {
  getArticleById,
  updateVotesById,
  getAllCommentsById,
  getAllArticles,
};
