const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
