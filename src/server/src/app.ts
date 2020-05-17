import express from 'express';

import config from './config';

import Logger from './loaders/logger';

async function startServer() {
  // Create an instance of the server
  const app = express();

  // Start up all modules
  await require('./loaders').default({ expressApp: app });

  // Start up the servers
  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      Server started at port ${config.port}
    `);
  });
}

startServer();
