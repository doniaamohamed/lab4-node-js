/*13. Update Post Routes
Tasks: - Add authenticate middleware to ALL post routes: - POST /posts - create post (with validation) 
- GET /posts - get all posts (with validation for query params) - GET /posts/:id - get post by ID - PATCH /posts/:id 
- update post (with validation) - DELETE /posts/:id - delete post
 - Ensure authenticate middleware runs before validation and controller functions*/

 const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');
const authenticate = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { createPostSchema, getAllPostsSchema, updatePostSchema } = require('../schemas/posts');

router.post('/', authenticate, validate(createPostSchema), postController.createPost);
router.get('/', authenticate, validate(getAllPostsSchema), postController.getAllPosts);

router.get('/:id', authenticate, postController.getPostById);

router.patch('/:id', authenticate, validate(updatePostSchema), postController.updatePostById);

router.delete('/:id', authenticate, postController.deletePostById);

module.exports = router;

