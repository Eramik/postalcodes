const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    countryCode: 'string',
    postalCode: 'string',
    placeName: 'string',
    adminName1: 'string', // Область
    adminName2: 'string' // Район
});
const PostalCodeEntry = mongoose.model('PostalCodeEntry', schema);

module.exports = PostalCodeEntry;