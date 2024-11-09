const Joi = require("joi");

const contactFormValidation = {
  body: Joi.object().keys({
    fullname: Joi.string()
      .required()
      .min(3)
      .max(50)
      .pattern(/^[a-zA-Z\s]*$/)
      .messages({
        "string.base": "Full Name should be a string.",
        "string.empty": "Full Name cannot be empty.",
        "string.min": "Full Name should be at least 3 characters long.",
        "string.max": "Full Name should be less than 50 characters.",
        "string.pattern.base": "Full Name should only contain letters and spaces.",
        "any.required": "Full Name is required.",
      }),
    
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.base": "Email should be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),

    mobile: Joi.string()
      .required()
      .pattern(/^[0-9]{10}$/)
      .messages({
        "string.base": "Mobile Number should be a string.",
        "string.empty": "Mobile Number cannot be empty.",
        "string.pattern.base": "Mobile Number should be exactly 10 digits.",
        "any.required": "Mobile Number is required.",
      }),

    city: Joi.string()
      .required()
      .max(50)
      .messages({
        "string.base": "City should be a string.",
        "string.empty": "City cannot be empty.",
        "string.max": "City Name should be less than 50 characters.",
        "any.required": "City is required.",
      }),
  }),
};

module.exports = { contactFormValidation };
