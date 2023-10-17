class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Message";
  err.statusCode = err.statusCode || 500;
  return res.status(400).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
