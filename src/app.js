// Main file.

// Init logger.
const logger = require('./utils/Logger');
try {
  // Init database controller.
  const DataController = require('./db/DataController');

  logger.info('App started successfully.');

  //DataController._importPostalCodeEntryFromFile('UA.txt');
} catch (err) {
  logger.error('Unexpected error at ' + __filename + ': ', err);
}