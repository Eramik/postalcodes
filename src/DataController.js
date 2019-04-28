const logger = require('./logger');
const mongoose = require('mongoose');
const cfg = require('../config/default');
mongoose.connect(cfg.mongodb.connectionURI, {useNewUrlParser: true}).then(
    () => { logger.info('Connected to mongoDB successfully') },
    err => { logger.error('Failed to connect to mongoDB', err) }
);

