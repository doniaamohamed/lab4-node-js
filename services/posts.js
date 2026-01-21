/*Tasks: - Update createPost function to accept userId parameter and include it in the post data when creating 
- Update getAllPosts function: - Accept userId parameter - Populate userId field with user data (name and email) 
- Add isOwner boolean flag to each post indicating if it belongs to the authenticated user 
- Convert posts to objects and compare post.userId._id (when populated) with authenticated userId 
- Update getPostById function: - Accept userId parameter - Populate userId field with user data (name and email) 
- Add isOwner boolean flag to the post - Convert post to object and compare post.userId._id (when populated) with authenticated userId 
- Update updatePostById function: - Accept userId parameter - Check if the post exists (return null if not found) 
- Check if the user is the author by comparing post.userId with userId - Throw APIError with status 403 if user is not the author 
- Update and return the post if user is authorized - Update deletePostById function: - Accept userId parameter 
- Check if the post exists (return null if not found) - Check if the user is the author by comparing post.userId with userId 
- Throw APIError with status 403 if user is not the author - Delete and return the post if user is authorized - Important: Services should check ownership and throw APIError for authorization errors, but return null for "not found" cases

 */
const Post = require('../models/posts');
const APIError = require('../utils/APIError');
const mongoose = require('mongoose');
const createPost = async (postData,userId) => {
    return await Post.create(postData,userId);
};

const getAllPosts = async (page, limit,userId) => {
   const postsPromise = Post.find({}, { password: 0 }).populate("userId", "name email").skip((page - 1) * limit).limit(limit);
    const totalPromise = Post.countDocuments();
    const [posts, total] = await Promise.all([postsPromise, totalPromise]);
    const postsWithOwner = posts.map(post => {
        const postObj = post.toObject();
        postObj.isOwner =
            postObj.userId &&
            postObj.userId._id.toString() === userId.toString();

        return postObj;
    });
    return { posts:postsWithOwner, total };
};

const getPostById = async (id,userId) => {
    const post = await Post.findOne({ _id: id }, {}).populate("userId", "name email");
     if (!post) return null;
        const postObj = post.toObject();
        postObj.isOwner =
            postObj.userId &&
            postObj.userId._id.toString() === userId.toString();

        return postObj;
};

const updatePost = async (id, updateData, userId) => {
      const post = await Post.findOne({ _id: id }, {});
     if (!post) return null;
     if (post.userId.toString() !== userId.toString()) {
        throw new APIError('Forbidden', 403);
    }

    Object.assign(post, updateData);
    await post.save();
    return post;
};

const deletePost = async (id,userId) => {
    const post=await Post.findById(id);
     if (!post) return null;

    if (post.userId.toString() !== userId.toString()) {
        throw new APIError('Forbidden', 403);
    }

    await post.deleteOne();
    return post;
};

module.exports = {createPost,getAllPosts,getPostById,updatePost,deletePost};