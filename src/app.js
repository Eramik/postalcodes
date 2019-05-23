// Main file.

const DataController = require('./classes/DataController');
const Searcher = require('./classes/Searcher');
const SearchParams = require('./classes/SearchParams');

// Init logger.
const logger = require('./utils/Logger');
//try {
  // Init database controller.
  const controller = new DataController('postalCodes.json');
  logger.info('App started successfully.');
  const searcher = new Searcher(controller.database);
  var r = searcher.search(new SearchParams({
    countryCode: 'UA',
    placeName: 'Харків'
  }, 3));  

  console.log(r);
//} catch (err) {
//  logger.error('Unexpected error at ' + __filename + ': ', err);
//}