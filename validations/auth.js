const Joi = require('joi')
module.exports = {
  validateLogin: function (obj) {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email').max(200).messages({
        'any.required': `{#label} is Required`,
        'string.email': 'Enter a valid email',
      }),
      password: Joi.string().required().label('Password').min(8).max(16).messages({
        'any.required': `{#label} is Required`,
        'string.min': `{#label} should be min 8 chars long`,
        'string.max': `{#label} should be max 16 chars long`,
      }),
    })
    return schema.validate(obj, { allowUnknown: true })
  },
  validateSignUp: function (obj) {
    const schema = Joi.object({
      email: Joi.string().email().required().label('Email').max(200).messages({
        'any.required': `{#label} is Required`,
        'string.email': 'Enter a valid email',
      }),
      password: Joi.string().required().label('Password').min(8).max(16).messages({
        'any.required': `{#label} is Required`,
        'string.min': `{#label} should be min 8 chars long`,
        'string.max': `{#label} should be max 16 chars long`,
      }),
      firstName: Joi.string().required().label('First Name').min(3).max(25).messages({
        'any.required': `{#label} is Required`,
        'string.min': `{#label} should be min 3 chars long`,
        'string.max': `{#label} should be max 25 chars long`,
      }),
      lastName: Joi.string().required().label('Last Name').min(3).max(25).messages({
        'any.required': `{#label} is Required`,
        'string.min': `{#label} should be min 3 chars long`,
        'string.max': `{#label} should be max 25 chars long`,
      }),
    })
    return schema.validate(obj, { allowUnknown: true })
  },
}
