const logger = require('./logger');
try {
    const mongoose = require('mongoose');
    const cfg = require('../config/default');

    const PostalCodeEntry = require('./PostalCodeEntry');
    const FeedbackEntry = require('./FeedbackEntry');

    mongoose.connect(cfg.mongodb.connectionURI, {useNewUrlParser: true}).then(
        () => { logger.info('Connected to mongoDB successfully') },
        err => { logger.error('Failed to connect to mongoDB: ', err) }
    );

    function insertPostalCode(postalCodeEntry, insertMany = false) {
        try {
            if(!postalCodeEntry) return false;

            if(insertMany) {
                return PostalCodeEntry.insertMany(postalCodeEntry, function(err) {
                    if(err) logger.error('Unable to insert many PostalCodeEntry: ', err);
                    else logger.info('Inserted many PostalCodeEntry successfully');
                });
            } 
            return PostalCodeEntry.create({
                countryCode: postalCodeEntry.countryCode,
                postalCode: postalCodeEntry.postalCode,
                placeName: postalCodeEntry.placeName,
                adminName1: postalCodeEntry.adminName1, // Область
                adminName2: postalCodeEntry.adminName2
            }, function (err) {
                if (err) logger.error('Unable to insert one PostalCodeEntry: ', err);
                // saved!
            });
        } catch(err) {
            logger.error('Unexpected error at ' + __filename + ' while inserting postal code: ', err);
        }
    }

    module.exports = {
        insertPostalCode
    }
} catch (e) {
    logger.error('Unexpected error at ' + __filename + ': ', e);
}
