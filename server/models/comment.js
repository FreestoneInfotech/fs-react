import mongoose from 'mongoose';
import User from '../models/user';
import Post from '../models/Post';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: 'String', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true  },
  post: { type: Schema.Types.ObjectId, ref: 'Post' }
}, {
    timestamps: true
});

export default mongoose.model('Comment', commentSchema);