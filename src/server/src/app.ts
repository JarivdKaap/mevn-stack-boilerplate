import express from 'express';

import config from './config';

import Logger from './loaders/logger';
import SocketIoLoader from './loaders/socketio'

async function startServer() {
  // Create an instance of the server
  const app = express();

  // Start up all modules
  await require('./loaders').default({ expressApp: app });

  // Start up the servers
  const server = app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      Server started at port ${config.port}
    `);
  });
  SocketIoLoader({server})
}

startServer();
