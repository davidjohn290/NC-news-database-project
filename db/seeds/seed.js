const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);
      const usersInsertions = knex("users").insert(userData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(() => {
      const formattedArticleData = formatDates(articleData);
      return knex.insert(formattedArticleData).into("articles").returning("*");
    })
    .then((formattedArticles) => {
      const refObjects = makeRefObj(formattedArticles);
      const formattedComments = formatComments(commentData, refObjects);
      return knex.insert(formattedComments).into("comments").returning("*");
    })
    .then((articleRows) => {
      const articleRef = makeRefObj(articleRows);
      const formattedComments = formatComments(commentData, articleRef);
      return knex("comments").insert(formattedComments);
    });
};
