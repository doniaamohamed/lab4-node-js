/*6. Implement Joi Validation Middleware
Tasks: - Create middlewares/validate.js - Accept a schema object that can validate req.body, req.query, 
and req.params - Use Joi to validate each specified part of the request - Throw APIError with status 400
 if validation fails - Call next() if validation passes
Example:
const APIError = require('../utils/APIError');

module.exports = (schema) => {
    return (req, res, next) => {
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], { abortEarly: true });
            if (error) {
                throw new APIError(error.details[0].message, 400);
            }
        }
        next();
    }
} */
const APIError = require('../utils/APIError');

module.exports = (schema) => {
    return (req, res, next) => {
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], { abortEarly: true });
            if (error) {
                throw new APIError(error.details[0].message, 400);
            }
        }
        next();
    }
}

