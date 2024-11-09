const Joi = require("joi");

const subscribeNewsletterValidation = {
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.base": "Email should be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),
  }),
};

module.exports = { subscribeNewsletterValidation };
