exports.up = function (knex) {
  return knex.schema.createTable("comments", (commentsTable) => {
    commentsTable.increments("comment_id");
    commentsTable.string("author").references("users.username");
    commentsTable.integer("article_id").references("articles.article_id");
    commentsTable.integer("votes").defaultsTo(0);
    commentsTable.timestamp("created_at").defaultsTo(knex.fn.now());
    commentsTable.text("body").notNullable;
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
