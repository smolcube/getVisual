//why do we need an error handler function?
// because the default error for express is an HTML
// we need one for thr API as a json object


// for endpoints API doesn't have
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };

const errorHandler = (err, req, res, nxt) =>{
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = { notFound, errorHandler };