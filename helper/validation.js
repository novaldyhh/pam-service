const Joi = require('@hapi/joi');

const adminValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().min(0)
    })
    const validation = schema.validate(data)
    return validation
}

module.exports.adminValidation = adminValidation