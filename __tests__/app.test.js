process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const connection = require("../db/connection");
const articlesRouter = require("../routers/articlesRouter");

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe("app", () => {
  describe("api", () => {
    // test("GET 200: responds with a JSON object of all the endpoints", () => {

    // });
    describe("topics", () => {
      test("GET 200: responds with all the topics wrapped in an object", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  slug: expect.any(String),
                  description: expect.any(String),
                }),
              ])
            );
          });
      });
      test("ERROR 404: responds with an error when accessing an endpoint that does not exist", () => {
        return request(app)
          .get("/api/allTopics")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid endpoint");
          });
      });
    });
    describe("users", () => {
      test("GET 200: responds with an object of a specific user ", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                avatar_url: expect.any(String),
                name: expect.any(String),
              })
            );
          });
      });
      test("ERROR 400: responds with an error when a non existent username is entered", () => {
        return request(app)
          .get("/api/users/noUser")
          .expect(404)
          .then(({ body }) => {
            expect(body.err).toBe("Bad request");
          });
      });
    });
    describe("articles", () => {
      test("GET 200: responds with a specific article object", () => {
        return request(app)
          .get("/api/articles/12")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(String),
              })
            );
          });
      });
      test("ERROR 400: responds with a 400 when given an article_id that does not exist", () => {
        return request(app)
          .get("/api/articles/985")
          .expect(404)
          .then(({ body }) => {
            expect(body.err).toBe("Bad request");
          });
      });
      test("PATCH 200: responds with a the updated article with the new vote count", () => {
        return request(app)
          .patch("/api/articles/12")
          .send({ inc_votes: 5 })
          .expect(200)
          .then(({ body }) => {
            expect(body.updatedArticle.votes).toBe(5);
            expect(body.updatedArticle).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
      });
      test("ERROR 400: responds with 400 error when passed a string instead of a number", () => {
        return request(app)
          .patch("/api/articles/12")
          .send({ inc_votes: "five" })
          .expect(400)
          .then(({ body }) => {
            console.log(body.msg);
            expect(body.msg).toBe("Bad request");
          });
      });
      test("POST 200: responds with the posted comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "It was a really interesting read. Would read again!",
          })
          .expect(201)
          .then(({ body }) => {
            console.log(body.postedComment);
            expect(body.postedComment).toEqual(
              expect.objectContaining({
                author: expect.any(String),
                body: expect.any(String),
                article_id: expect.any(Number),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_id: expect.any(Number),
              })
            );
          });
      });
      test("ERROR 404: responds with a 400 error when given an invalid article Id", () => {
        return request(app)
          .post("/api/articles/1243/comments")
          .send({
            username: "butter_bridge",
            body: "It was a really interesting read. Would read again!",
          })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid article Id");
          });
      });
      test("GET 200: responds with the comments for a specified article__id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            body.comments.forEach((comment) => {
              expect(comment).toEqual({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              });
            });
          });
      });
      test("GET 200: defaults to sort_by created_at when no sort query is added", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy("created_at", {
              descending: true,
              coerce: true,
            });
          });
      });
      test("GET 200: responds with the comments sorted by the specified column", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=comment_id")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy("comment_id", {
              descending: true,
              coerce: true,
            });
          });
      });
      test("GET 200: orders the comments in ascending order when specified", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy("comment_id", {
              ascending: true,
              coerce: true,
            });
          });
      });
      test("GET 200: responds with all the article objects in an array", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toEqual(
              expect.arrayContaining([
                expect.objectContaining({
                  author: expect.any(String),
                  title: expect.any(String),
                  article_id: expect.any(Number),
                  topic: expect.any(String),
                  created_at: expect.any(String),
                  votes: expect.any(Number),
                  comment_count: expect.any(String),
                }),
              ])
            );
          });
      });
      test("GET 200: responds with all the article objects sorted by default to date and in descending order", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).toBeSortedBy("created_at", {
              descending: true,
              coerce: true,
            });
          });
      });
      test("GET 200: responds with all the articles relating to the queried author", () => {
        return request(app)
          .get("/api/articles?author=rogersop")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(
              articles.every((article) => article.author === "rogersop")
            ).toBe(true);
          });
      });
      test("GET 200: responds with all the articles relating to the queried topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBeGreaterThanOrEqual(1);
            expect(articles.every((article) => article.topic === "mitch")).toBe(
              true
            );
          });
      });
      test("ERROR 404: responds with a 404 error when sorted by a column that does not exist", () => {
        return request(app)
          .get("/api/articles?page=1")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid sort by query");
          });
      });
    });
    describe("comments", () => {
      test("PATCH 200: responds with a comments object with the updated vote property", () => {
        return request(app)
          .patch("/api/comments/12")
          .send({ inc_votes: 13 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.comment_id).toBe(12);
            expect(body.comment.votes).toBe(13);
          });
      });
      test("ERROR 400: responds with 400 error when using an invalid comment_id", () => {
        return request(app)
          .patch("/api/comments/butter_bridge")
          .send({ inc_votes: 13 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Bad request");
          });
      });
      test("DELETE 204: responds with a 204 status to confirm deletion", () => {
        return request(app).del("/api/comments/4").expect(204);
      });
      test("ERROR 404: responds with a 404 error when comment_id is not found", () => {
        return request(app)
          .del("/api/comments/879")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Comment_id not found");
          });
      });
      test("ERROR 405: responds with a 405 error when using an invalid method", () => {
        return request(app)
          .get("/api/comments/9")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method used");
          });
      });
    });
  });
});
