import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: 'String', required: true},
  lname: { type: 'String', required: true},
  username: { type: 'String', required: true },
  password: { type: 'String', required: true }
});

userSchema.virtual('fullName').get(function () {
  return this.fname + ' ' + this.lname;
});

export default mongoose.model('User', userSchema);
