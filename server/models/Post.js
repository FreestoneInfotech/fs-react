import mongoose from 'mongoose';
import Bear from '../models/Bear';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  name: { type: 'String'},
  _bearId : { type: Schema.Types.ObjectId, ref: 'Bear' },
  //_bears : [{ type: Schema.Types.ObjectId, ref: 'Bear' }]
  /*name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },*/
});

export default mongoose.model('Post', postSchema);
