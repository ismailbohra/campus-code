const Contact = require('../models/Contact');

exports.createContact = async (contactData) => {
  const contact = new Contact(contactData);
  return await contact.save();
};

exports.getContacts = async () => {
  return await Contact.find();
};

exports.deleteContact = async (id) => {
  return await Contact.findByIdAndDelete(id);
};
