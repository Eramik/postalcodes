const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    countryCode: 'string',
    postalCode: 'string',
    placeName: 'string',
    adminName1: 'string', // Region
    adminName2: 'string' // Community
});
const PostalCodeEntry = mongoose.model('PostalCodeEntry', schema);

module.exports = PostalCodeEntry;