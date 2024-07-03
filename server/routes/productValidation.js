const Joi = require("joi");

function validateProduct(body) {
  const schema = Joi.object().keys({
    category: Joi.string().required(),
    dateOfInvoice: Joi.date().required(),
    serialNumber: Joi.string().required(),
    model: Joi.string().required(),
  });
  const { value, error } = schema.validate(body, {
    allowUnknown: true,
  });
  if (error && error.details) {
    return {
      error,
    };
  }
  return {
    value,
  };
}

module.exports = { validateProduct };
