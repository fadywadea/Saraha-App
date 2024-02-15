
export const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  process.env.MODE == "Prod" ?
    res.status(err.statusCode).json({ error: err.message }) :
    res.status(err.statusCode).json({ error: err.message, stack: err.stack });
};