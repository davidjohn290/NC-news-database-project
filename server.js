const express = require("express");
const app = express();
const { apiRouter } = require("./routers/apiRouter");
const {
  noEndpointError,
  customErrors,
  psqlErrors,
} = require("./errors/errorHandling");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", noEndpointError);

app.use(customErrors);
app.use(psqlErrors);
module.exports = app;
