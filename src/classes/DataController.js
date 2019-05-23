const fs = require('fs');
const readline = require('readline');

const PostalCodeEntry = require('./PostalCodeEntry');
const logger = require('../utils/Logger');


class DataController {
    database;
    _initPath;

    constructor(pathToFile = null) {
        if(!pathToFile) {
            this.database = [];
            return;
        }

        if(!fs.existsSync(pathToFile)) throw new Error("File doesn't exist.");
        this._initPath = pathToFile;

        this.database = fs.readFileSync(pathToFile, {encoding: 'utf-8'});
        this.database = JSON.parse(this.database);
    }

    importPostalCodesFromFile(pathToFile) {
        try {
            if(!pathToFile) throw new Error('No argument given.');
            if(!fs.existsSync(pathToFile)) throw new Error("File doesn't exist.");
        
            const fileStream = fs.createReadStream(pathToFile, {encoding: 'utf-8'});
            const rl = readline.createInterface({
                input: fileStream
            });
        
            rl.on('line', line => {
                let data = line.split('\t');
                let postalCodeEntry = {
                    countryCode: data[0],
                    postalCode: data[1],
                    placeName: data[2],
                    region: data[3],
                    community: data[5]
                };
                this.database.push(new PostalCodeEntry(postalCodeEntry));
            });
        
            rl.on('close', async () => {
                logger.info('Importing many PostalCodeEntry finished successfully.');
                this.exportData('postalCodes.json');
            });    
        } catch (err) {
            logger.error('Unexpected error at ' + __filename + ' while trying to import postal code entry from file: ', err);
        }

    }

    exportData(pathToFile = this._initPath) {
        if(!pathToFile) throw new Error('No argument given.');

        fs.writeFile(pathToFile, JSON.stringify(this.database), {encoding: 'utf-8'}, e => {
            console.log("error: ", e);
            console.log(this.database.length);
        });
    }
}

module.exports = DataController;