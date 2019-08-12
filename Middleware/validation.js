const Joi = require('joi');

function validateInput(input) {
    const schema = {
        upperValue: Joi.number().integer.min(0).max(300).required(),
        lowerValue: Joi.number().integer.min(0).max(300).required()
    };
    return Joi.validate(input, schema);
};
module.exports = validateInput;
