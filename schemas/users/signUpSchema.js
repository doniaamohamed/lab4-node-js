/*Create validation schema for sign-up: - name: string, alphanum, min 3, max 30, required 
- email: string, email format, required (with custom error message) 
- password: string, min 8, max 30, required 
- repeatPassword: must match password using Joi.ref('password'), required
 - age: number, min 18, max 150, required 
 - Export schema object with body property containing the Joi validation object */

const Joi = require('joi');

const signUpSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),

    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address',
    }),

    password: Joi.string().min(8).max(30).required(),

    repeatPassword: Joi.string()
      .valid(Joi.ref('password'))
      .required()
      .messages({
        'any.only': 'Passwords do not match',
      }),

    age: Joi.number().min(18).max(150).required(),
  }),
};

module.exports = signUpSchema;
