const Client = require('../models/clients');

exports.createClient = async (clientData) => {
  const client = new Client(clientData);
  return await client.save();
};

exports.getAllClients = async (req) => {
  const clients = await Client.find();

  return clients.map(client => ({
    ...client.toObject(),
    imageUrl: client.image ? `${req.protocol}://${req.get('host')}/uploads/${client.image}` : null,
  }));
};


exports.deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};
