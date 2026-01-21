/*7. Update User ServiceTasks: - Remove the createUser function (replaced by signUp) 
- Add signUp function: - Check if user with email already exists (throw APIError if exists)
 - Hash password using bcrypt.hash() with salt rounds of 12 
 - Create user with hashed password - Return created user 
 - Add signIn function: - Find user by email 
 - Compare provided password with hashed password using bcrypt.compare() 
 - If password matches, generate JWT token with payload: { userId, role }
  - Use util.promisify() to convert jwt.sign() to a promise-based function 
  - Set token expiration to 1 hour using { expiresIn: '1h' } 
  - Return an object with token and user (user data without password) 
  - Throw APIError with status 401 if email or password is invalid (use generic message: "Invalid email or password") 
  - Keep other service functions (getAllUsers, getUserById, updateUserById, deleteUserById) unchanged
 
  const createUser = async (userData) => {
    const createdUser = await User.create(userData);
    return createdUser;
}*/
const util = require('util');
const User = require('../models/users');
const APIError = require('../utils/APIError');
//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

//const jwtSign = util.promisify(jwt.sign);


const signUp = async (userData) => {
    const { email, password } = userData;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new APIError("User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 12);//het3ml hash 12 mara yakhod wa2t atwl 3lshan etfk
    const user = await User.create({ ...userData, password: hashedPassword });
    return user;
}


const signIn = async ({ email, password }) => {
    const user = await User.findOne({ email }, { createdAt: 0, updatedAt: 0, __v: 0 });

    if (!user) {
        throw new APIError("Invalid email or password", 401);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new APIError("Invalid email or password", 401);
    }

    const payload = { //دا اللي هيتخزن جوا التوكن
        userId: user._id,
        role: user.role
    }

    const token = await jwtSign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user: { ...user.toObject(), password: undefined } };

}


const getAllUsers = async (query) => {
    let { page, limit } = query;
    page = Number(page);
    limit = Number(limit);
    const usersPromise = User.find({}, { password: 0 }).skip((page - 1) * limit).limit(limit);
    const totalPromise = User.countDocuments();
    const [users, total] = await Promise.all([usersPromise, totalPromise]);
    const pagenation = {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
    }
    return { users, pagenation };
}



const getUserById = async (id) => {
    const user = await User.findOne({ _id: id }, { password: 0 });
    if (!user) {
        return null;
    }
    return user;
}


const updateUserById = async (id, userData) => {
    const updatedUser = await User.findOneAndUpdate({ _id: id }, userData, { new: true });
    if (!updatedUser) {
        return null;
    }
    return updatedUser;
}


const deleteUserById = async (id) => {
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
        return null;
    }
    return deletedUser;
}

module.exports = { signUp, getAllUsers, getUserById, updateUserById, deleteUserById, signIn };