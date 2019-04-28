const logger = require('./logger');
const mongoose = require('mongoose');
const cfg = require('../config/default');

const PostalCodeEntry = require('./PostalCodeEntry');
const FeedbackEntry = require('./FeedbackEntry');

mongoose.connect(cfg.mongodb.connectionURI, {useNewUrlParser: true}).then(
    () => { logger.info('Connected to mongoDB successfully') },
    err => { logger.error('Failed to connect to mongoDB', err) }
);
