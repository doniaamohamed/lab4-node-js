/*Create validation schema for sign-in: - email: string, email format, required (with custom error message)
 - password: string, min 8, max 30, required
  - Export schema object with body property containing the Joi validation object
 */
const Joi = require('joi');

const signInSchema = { body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Invalid email address'
    }),
    password: Joi.string().min(8).max(30).required()
  })
};

module.exports = signInSchema;



