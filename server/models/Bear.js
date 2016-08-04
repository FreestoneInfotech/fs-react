import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import Post from '../models/Post';


const BearSchema = new Schema({
    name: String,
    _postId : { type: Schema.Types.ObjectId, ref: 'Post' }
})

export default mongoose.model('Bear', BearSchema)



/*Student/2
    name
    bears:[3,4]



1 ,
    a
    4
2
    b,
    4


3
    c,
    2


4
    d,
    2*/