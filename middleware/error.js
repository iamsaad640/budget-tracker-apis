const error = (err, req, res, next) => {
  // todo: log error in log file
  res.formatter.serverError("unexpected error occured");
};

export default error;
