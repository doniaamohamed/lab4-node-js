/*12.Update Post ControllerTasks:- Update createPost to use req.user.userId from authentication middleware and pass it to service 
- Update getAllPosts to pass req.user.userId to service (for ownership flag) 
- Update getPostById to pass req.user.userId to service (for ownership flag) 
- Update updatePostById to pass req.user.userId to service 
- Update deletePostById to pass req.user.userId to service 
- Handle "not found" cases by throwing APIError with status 404 when service returns null - Ensure all post routes require authentication (handled in routes, not controller)
 */
const postService = require('../services/posts');
const mongoose = require('mongoose');
const APIError = require('../utils/APIError');
const createPost = async (req, res) => {
    const { title, content, author, tags, likes } = req.body;
    const userId = req.user.userId;
    if (!title || !author || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const post = await postService.createPost({ title, author, content, tags, likes },userId);
    res.status(201).json({ message: "Post created successfully", data: post });
};

const getAllPosts = async (req, res, next) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = Math.max(Number(page), 1); 
    limit = Math.min(Math.max(Number(limit), 1), 100);
    const userId = req.user.userId;
    const { posts, total } = await postService.getAllPosts(page, limit, userId);

    res.json({
      message: "Posts fetched successfully",
      data: posts,
      pagination: { 
        page, 
        limit, 
        total, 
        totalPages: Math.ceil(total / limit) 
      }
    });
  } catch (err) {
    next(err); 
  }
};


const getPostById = async (req, res) => {
    let { id } = req.params;
    const userId = req.user.userId;
    if (!mongoose.isValidObjectId(id)) {
       throw new APIError("Invalid post ID", 400);
    }

    const post = await postService.getPostById(id,userId);
    
    if (!post) {
        throw new APIError("post not found", 400);
    }
    res.json({ message: "Posts fetched successfully", data: post });
};

const updatePostById = async (req, res) => {
    let { id } = req.params;
    const userId = req.user.userId;
    if (!mongoose.isValidObjectId(id)) {
       throw new APIError("Invalid post ID", 400);
    }

    const { title, content, author, tags, published } = req.body;
    const updatedposts = await postService.updatePostById(id, { title, content, author, tags, published },userId);
    if (!updatedposts) {
        throw new APIError("post not found", 400);
    }

    res.json({ message: "Posts updated successfully", data: updatedposts });
};

const deletePostById = async (req, res) => {
    let { id } = req.params;
    const userId = req.user.userId;
    if (!mongoose.isValidObjectId(id)) {
        throw new APIError("Invalid post ID", 400);
    }

    const deletePostById= await postService.deletePostById(id,userId);

    if (!deletedposts) {
       throw new APIError("post not found", 400);
    }

    res.json({ message: "Posts deleted successfully", data: deletedposts });
};

module.exports = {createPost,getAllPosts,getPostById,updatePostById,deletePostById};