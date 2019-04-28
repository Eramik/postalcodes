// The DataController module implements API to interact with database.

const logger = require('./utils/Logger');
try {
    const mongoose = require('mongoose');

    const cfg = require('../config/default');

    const PostalCodeEntry = require('./models/PostalCodeEntry');
    const FeedbackEntry = require('./models/FeedbackEntry');

    mongoose.connect(cfg.mongodb.connectionURI, {useNewUrlParser: true}).then(
        () => { logger.info('Connected to mongoDB successfully') },
        err => { logger.error('Failed to connect to mongoDB: ', err) }
    );

    // Inserts one or many PostalCodeEntry objects to MongoDB.
    //
    // The structur of `postalCodeEntry` object must correspond to PostalCodeEntry model.
    // `postalCodeEntry` must be an array if insertMany === true.
    function insertPostalCode(postalCodeEntry, insertMany = false) {
        try {
            if(!postalCodeEntry) return logger.error('No given argument to insertPostalCode');

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

    function _importPostalCodeEntryFromFile(pathToFile) {

    }

    module.exports = {
        insertPostalCode
    }
} catch (e) {
    logger.error('Unexpected error at ' + __filename + ': ', e);
}
