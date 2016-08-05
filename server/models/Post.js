import mongoose from 'mongoose';
import User from '../models/user';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String'},
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true  }
}, {
    timestamps: true
});

export default mongoose.model('Post', postSchema);
