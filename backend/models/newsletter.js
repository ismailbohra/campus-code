const mongoose = require('mongoose');

const NewsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
},{
  timestamps:true
});

const NewsLetter = mongoose.model('NewsLetter', NewsLetterSchema);

module.exports = NewsLetter;
