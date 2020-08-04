const express = require("express");
const app = express();
const { apiRouter } = require("./routers/apiRouter");
const { noEndpointError, customErrors } = require("./errors/errorHandling");

app.use(express.json());

app.use("/api", apiRouter);

app.all("/*", noEndpointError);

app.use(customErrors);

module.exports = app;
