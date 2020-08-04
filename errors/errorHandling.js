const noEndpointError = (req, res, next) => {
  res.status(404).send({ msg: "Invalid endpoint" });
};

const customErrors = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ err: "Bad request" });
  } else {
    (err) => {
      console.log(err);
    };
  }
};

module.exports = { customErrors, noEndpointError };
