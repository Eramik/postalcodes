// The PostalCodeEntry module defines MongoDB model.

const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
  countryCode: 'string',
  postalCode: 'string',
  placeName: 'string',
  adminName1: 'string', // Region
  adminName2: 'string' // Community
});
schema.index({ 
  countryCode: 'text', 
  postalCode: 'text', 
  placeName: 'text', 
  adminName1: 'text', 
  adminName2 : 'text' 
});
const PostalCodeEntry = mongoose.model('PostalCodeEntry', schema);

module.exports = PostalCodeEntry;