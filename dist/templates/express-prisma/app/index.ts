
import express from 'express'
import logger from 'loglevel'
import config from './config'
import runLoaders from './loaders'
import 'express-async-errors';

logger.setLevel('info')

function bootApp() {
  const {appPrefix, port} = config;
  const app = express()

  runLoaders({ app });

  app.listen(port, () => {
    logger.info(`🚀 Server started and ready on http://localhost:${port}/${appPrefix} 🚀`)
  });
}

bootApp();