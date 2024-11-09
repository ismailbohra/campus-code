const NewsLetter = require("../models/newsletter");

exports.subscribe = async (email) => {
  const existingSubscriber = await NewsLetter.findOne({ email });
  if (existingSubscriber) {
    throw new Error("Email is already subscribed.");
  }
  const newSubscriber = new NewsLetter({ email });
  return await newSubscriber.save();
};

exports.getAllSubscribers = async () => {
  return await NewsLetter.find();
};

exports.deleteSubscriber = async (id) => {
  const subscriber = await NewsLetter.findByIdAndDelete(id);
  if (!subscriber) {
    throw new Error("Subscriber not found.");
  }
  return subscriber;
};
