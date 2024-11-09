const newsletterService = require("../services/newsLetterService");

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }
    const subscriber = await newsletterService.subscribe(email);
    res
      .status(201)
      .json({
        message: "Successfully subscribed to the newsletter.",
        data: subscriber,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterService.getAllSubscribers();
    res.status(200).json({ data: subscribers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching subscribers.", error: error.message });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscriber = await newsletterService.deleteSubscriber(id);
    res
      .status(200)
      .json({
        message: "Subscriber deleted successfully.",
        data: deletedSubscriber,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
