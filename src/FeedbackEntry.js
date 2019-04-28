const mongoose = require('mongoose');

const schema = new mongoose.Schema({ 
    email: 'string',
    feedback: 'string'
});
const FeedbackEntry = mongoose.model('FeedbackEntry', schema);

module.exports = FeedbackEntry;