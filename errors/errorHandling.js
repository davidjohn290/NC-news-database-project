const noEndpointError = (req, res, next) => {
  res.status(404).send({ msg: "Invalid endpoint" });
};

const custom405Error = (req, res, next) => {
  res.status(405).send({ msg: "Invalid method used" });
};

const customErrors = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ err: "Bad request" });
  } else if (err.status === 404) {
    res.status(404).send({ msg: "Comment_id not found" });
  } else next(err);
};

const psqlErrors = (err, req, res, next) => {
  if (err.code === "42703") {
    res.status(404).send({ msg: "Invalid sort by query" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Invalid article Id" });
  } else {
    console.log(err);
  }
};

module.exports = { customErrors, noEndpointError, psqlErrors, custom405Error };
