const contactService = require('../services/contactService');

exports.createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json({ message: 'Contact created successfully', data: contact });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContacts();
    res.status(200).json({ message: 'Contacts retrieved successfully', data: contacts });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await contactService.deleteContact(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};
