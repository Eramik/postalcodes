// The DataController module implements API to interact with database.

const logger = require('../utils/Logger');
try {
    const mongoose = require('mongoose');

    const cfg = require('../../config/default');

    const PostalCodeEntry = require('../models/PostalCodeEntry');
    const FeedbackEntry = require('../models/FeedbackEntry');

    mongoose.connect(cfg.mongodb.connectionURI, {useNewUrlParser: true}).then(
        () => { logger.info('Connected to mongoDB successfully') },
        err => { logger.error('Failed to connect to mongoDB: ', err) }
    );

    // Inserts one or many PostalCodeEntry objects to MongoDB.
    //
    // The structure of `postalCodeEntry` object must correspond to PostalCodeEntry model.
    // `postalCodeEntry` must be an array if insertMany === true.
    function insertPostalCode(postalCodeEntry, insertMany = false) {
        try {
            if(!postalCodeEntry) return logger.error('No given argument to insertPostalCode');

            if(insertMany) {
                return insertManyPostalCode(postalCodeEntry);
            } 
            return insertOnePostalCode(postalCodeEntry);
        } catch(err) {
            logger.error('Unexpected error at ' + __filename + ' while inserting postal code: ', err);
        }
    }

    // Inserts a batch of PostalCodeEntry into databse.
    // The `postalCodeEntryArr` argument is an array of objects which correspond to PostalCodeEntry model.
    function insertManyPostalCode(postalCodeEntryArr) {
        try {
            return PostalCodeEntry.insertMany(postalCodeEntryArr, function(err) {
                if(err) logger.error('Unable to insert many PostalCodeEntry: ', err);
                else logger.info('Inserted many PostalCodeEntry successfully.');
            });
        } catch (err) {
            logger.error('Unexpecter error at ' + __filename + ' while trying to insertManyPostalCode: ', err);
        }
    }

    // Inserts PostalCodeEntry into database.
    // The `postalCodeEntry` argument must correspond with PostalCodeEntry model.
    function insertOnePostalCode(postalCodeEntry) {
        try {
            return PostalCodeEntry.create({
                countryCode: postalCodeEntry.countryCode,
                postalCode: postalCodeEntry.postalCode,
                placeName: postalCodeEntry.placeName,
                adminName1: postalCodeEntry.adminName1,
                adminName2: postalCodeEntry.adminName2
            }, function (err, postalCode) {
                if (err) logger.error('Unable to insert one PostalCodeEntry: ', err);
                else {
                    logger.info('Inserted one PostalCodeEntry successfully.');
                    logger.debug('The inserted PostalCode object: ', postalCode);
                } 
            });
        } catch (err) {
            logger.error('Unexpected error at ' + __filename + ' while inserting one postal code: ', err);
        }
    }

    // Imports PostalCodeEntry objects to database from UTF-8 text file with fields separated with tabs.
    // Fields order must correspond with PostalCodeEntry model.
    function _importPostalCodeEntryFromFile(pathToFile) {

    }

    module.exports = {
        insertPostalCode,
        _importPostalCodeEntryFromFile
    }
} catch (e) {
    logger.error('Unexpected error at ' + __filename + ': ', e);
}
