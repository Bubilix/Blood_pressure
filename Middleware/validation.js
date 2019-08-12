const Joi = require('Joi');

const schema = {
    upperValue: Joi.number.integer.min(1).max(300).required(),
    lowerValue: Joi.number.integer.min(1).max(300).required()
}

module.exports = Joi.validate('Validation', schema);