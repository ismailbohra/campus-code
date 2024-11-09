const clientService = require('../services/clientService');

exports.createClient = async (req, res) => {
  try {
    const clientData = { ...req.body };
    if (req.file) {
      clientData.image = req.file.filename;
    }

    const client = await clientService.createClient(clientData);
    res.status(201).json({ message: 'Client created successfully', data: client });
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await clientService.getAllClients(req);
    res.status(200).json({ message: 'Clients retrieved successfully', data: clients });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clients', error: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await clientService.deleteClient(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error: error.message });
  }
};
