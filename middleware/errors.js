export default function errorHandlingMiddleware(err, req, res, next) {
  console.log("Original Error: ", err);
  const statusCode = err.statusCode || 500;
  const env = process.env.NODE_ENV || "development";

  const error =
    env === "development" && statusCode > 499
      ? `Server encountered an error during ${req.method} at ${req.path}: ${err.message}`
      : env === "production"
      ? "An error occurred while processing your request."
      : err;

  return res.status(statusCode).json({ error });
}
