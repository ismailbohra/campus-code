const Joi = require("joi");
const { validEmail, passwordValidation } = require("./custom.validation");

const registerUser = {
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(0)
      .max(30)
      .pattern(/^[a-zA-Z\s]*$/)
      .message(
        "name should be less than 30 characters and no special characters"
      ),
    email: Joi.string().required().email().messages(validEmail("Email")),
    password: Joi.string().required().custom(passwordValidation),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(validEmail("Email")),
    password: Joi.string().required(),
  }),
};
const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(validEmail("Email")),
  }),
};
const changePassword = {
  body: Joi.object().keys({
    oldpassword: Joi.string().required(),
    newpassword: Joi.string().required(),
  }),
};
const updateUser = {
  body: Joi.object().keys({
    name: Joi.string()
      .min(0)
      .max(30)
      .pattern(/^[a-zA-Z\s]*$/)
      .message(
        "FirstName should be less than 30 characters and no special characters"
      ),
    password: Joi.string().custom(passwordValidation),
    email: Joi.string().email().messages(validEmail("Email")),
    id:Joi.number().required()
  }),
};
const getUser = Joi.object({
  params: Joi.object({
    userId: Joi.number().integer().positive().required(),
  }),
});

module.exports = {
  registerUser,
  getUser,
  login,
  updateUser,
  forgotPassword,
  changePassword
};
