/*4. Update Post Model
Tasks: - Add a userId field to the Post schema that references the User model 
- Change the author field from String to ObjectId reference 
(or keep both - author as String for display and userId as ObjectId for reference) 
- Recommended approach: Keep author as String (author name) and add userId as ObjectId reference to User
 - Use mongoose.Schema.Types.ObjectId with ref: 'User' for the userId field 
*/
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
   title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
   tags: { type: [String ]},
    published:{type: Boolean,default:false},
     likes: { type: Number,default: 0},
     userId:{type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
