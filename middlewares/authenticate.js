/*Extract JWT token from Authorization header (format: Bearer <token>) 
- Verify the token using jsonwebtoken and JWT_SECRET 
- Use util.promisify() to convert jwt.verify() to a promise-based function 
- Attach user information to req.user object with userId and role properties
 - Throw APIError with status 401 if token is missing or invalid 
 - Handle errors appropriately and throw APIError for any verification failures */
 const jwt = require('jsonwebtoken');
const util = require('util');
const APIError = require('../utils/APIError');

const jwtVerify = util.promisify(jwt.verify);

const authenticate = async (req, res, next) => {
    try {
        const tokenData = req.headers.authorization;
        const token = tokenData.split(" ")[1]; //3lshan skip  Bearer wamsk <token>

        const decodedData = await jwtVerify(token, process.env.JWT_SECRET); //و يتاكد ان التوكن صحيح ويفك التوكن

        req.user = {
            userId: decodedData.userId,
            role: decodedData.role
        };

        next();
    } catch (error) {
        console.error("❌❌ error in authenticate middleware", error.message);
        throw new APIError("Unauthorized", 401);
    }
}

module.exports = authenticate;