# _README for my NC-News API_

## Heroku link for hosted app

- https://git.heroku.com/getting-nc-news.git

## Available Endpoints

```http
GET /api/topics
```

- Retrieves all the topic objects

---

```http
GET /api/users/:username
```

- Retrieves a user object using the specific username

---

```http
GET /api/articles/:articles_id
```

- Retrieves an article object using the specific article ID

---

```http
PATCH /api/articles/:article_id
```

- Updates the current article's vote counter by the specified amount and then returns the updated article object

---

```http
POST /api/articles/:article_id/comments
```

- Adds a new comment to the specified article and returns the posted comment

---

```http
GET /api/articles/:article_id/comments
```

- Retrieves all the comments for the specified article and accepts the following queries:

1. 'sort_by' which sorts by any valid column but defaults to 'created_at' if not used
1. 'order' which can be either 'asc or 'desc' but defaults to 'desc' if not used

---

```http
GET /api/articles
```

- Retrieves all the article and accepts the following queries:

1. 'sort_by' which sorts by any valid column but defaults to 'date' if not used
1. 'order' which can be set to either 'asc' or 'desc' but defaults to 'desc' if not used
1. 'author' which filters the articles by the username value specified in the query
1. `topic`, which filters the articles by the topic value specified in the query

---

```http
PATCH /api/comments/:comment_id
```

- Updated the current comment's vote counter and returns the updated comment

---

```http
DELETE /api/comments/:comment_id
```

- delete the comment specified by the comment Id and only returns a 204 status code

---
