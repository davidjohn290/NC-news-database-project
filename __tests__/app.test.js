process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server");
const connection = require("../db/connection");

beforeEach(() => {
  return connection.seed.run();
});

afterAll(() => {
  return connection.destroy();
});

describe("app", () => {
  describe("api", () => {
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
          .expect(400)
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
          .expect(400)
          .then(({ body }) => {
            expect(body.err).toBe("Bad request");
          });
      });
      test.only("PATCH 200: responds with a the updated article with the new vote count", () => {
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
    });
  });
});
