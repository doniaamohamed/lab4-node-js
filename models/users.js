/*3. Update User Model
Tasks: - Ensure your User model has a role field with enum ['admin', 'user'] and default 'user' 
- Ensure email has a unique index - The model should already have: name, email, password, role, age, 
and timestamps */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
    age: { type: Number, required: true, min: 18, max: 150 },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;