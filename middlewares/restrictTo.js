/*Accept an array of allowed roles as a parameter (returns a middleware function) 
- Check if req.user.role is in the allowed roles array
 - Throw APIError with status 403 if user doesn't have required role 
 - This middleware should be used AFTER authenticate middleware (since it depends on req.user)
 */
const APIError = require('../utils/APIError');

const restrictTo = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new APIError("Invalid User Type", 403);
        }
        next();
    }
}

module.exports = restrictTo;