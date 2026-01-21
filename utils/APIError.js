/* Create utils/APIError.js - Create a custom error class that extends Error - Include statusCode and 
isClientError properties - Use Error.captureStackTrace() for proper stack traces
Example:
class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = APIError; */

class APIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isClientError = this.statusCode >= 400 && this.statusCode < 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = APIError;
