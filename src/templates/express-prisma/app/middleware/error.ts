import logger from 'loglevel'

// setup default error handler so i know what happened on server on unhandled error :)
export default function errorMiddleware(error, req, res, next) {
    if (res.headersSent) {
      next(error)
    } else {
      logger.error(error)
      res.status(500)
      res.json({
        message: error.message,
        ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
      })
    }
}