module.exports = {
    signUpSchema: require('./signUpSchema'),
    signInSchema: require('./signInSchema'),
    getAllUsersSchema: require('./getAllUsersSchema'),
    updateUserSchema: require('./updateUserSchema'),
}
/*9.3 Update Schema Index (schemas/users/index.js)
Tasks: - Export all user schemas including the new signUpSchema and signInSchema
 - Keep existing exports: getAllUsersSchema and updateUserSchema */