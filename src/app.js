// Main file.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const DataController = require('./classes/DataController');
const Searcher = require('./classes/Searcher');
const SearchParams = require('./classes/SearchParams');

// Init logger.
const logger = require('./utils/Logger');
  // Init database controller.
const controller = new DataController('postalCodes.json');
//controller.importPostalCodesFromFile('US.txt');
const searcher = new Searcher(controller.database);
logger.info('App started successfully.');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.post('/search', (req, res) => {
  console.log('req started');
  let params = new SearchParams(req.body.searchData, req.body.resultsLimit);
  let r = searcher.search(params);
  res.send(r);
  console.log('Finished: ', r.length);
});
/*
let params = new SearchParams({placeName: 'харкив'}, 1);
  let r = searcher.search(params);
  console.log(r);*/


app.listen(port, () => console.log(`Аpp listening on port ${port}!`));