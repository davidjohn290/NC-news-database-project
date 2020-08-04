const {
  fetchArticleById,
  patchVotesById,
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

module.exports = { getArticleById, updateVotesById };
