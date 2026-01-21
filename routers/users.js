/*10. Update User Routes
Tasks: - Remove the POST /users route (create user) - Add POST /users/sign-up route (public, no authentication 
required) - Apply validation middleware with signUpSchema - Map to usersController.signUp 
- Add POST /users/sign-in route (public, no authentication required) - Apply validation middleware with signInSchema
- Map to usersController.signIn - Protect GET /users route with authenticate middleware and restrictTo(['admin']) 
- Apply authentication and admin restriction to other user management routes:
- GET /users/:id - requires authenticate and restrictTo(['admin']) - PATCH /users/:id - requires authenticate, restrictTo(['admin']), and validation -
 DELETE /users/:id - requires authenticate and restrictTo(['admin'])

*/
const express = require('express');
const usersController = require('../controllers/users');
const schemas = require('../schemas/users');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const restrictTo = require('../middlewares/restrictTo');
const router = express.Router();

//router.post('/', validate(schemas.createUserSchema),usersController.createUser);
router.post('/sign-up',validate(schemas.signUpSchema),usersController.signUp);
router.post('/sign-in',validate(schemas.signInSchema),usersController.signIn);
router.get('/',authenticate,restrictTo(['admin']),usersController.getAllUsers);
router.get( '/:id', authenticate, restrictTo(['admin']), usersController.getUserById);

router.patch( '/:id', authenticate, restrictTo(['admin']), validate(schemas.updateUserSchema), usersController.updateUserById
);
router.delete('/:id',authenticate,restrictTo(['admin']),usersController.deleteUserById);
module.exports = router;