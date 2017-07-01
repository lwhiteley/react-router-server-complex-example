/**
 * Created by layton on 6/18/17.
 */
import mongoose, { Schema } from 'mongoose';
import hooks from './user.hooks';

const schema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  isVerified: { type: Boolean },
  verifyToken: { type: String },
  verifyShortToken: { type: String },
  verifyExpires: { type: Date }, // or a long integer
  verifyChanges: {},  // an object (key-value map), e.g. { field: "value" }
  resetToken: { type: String },
  resetShortToken: { type: String },
  resetExpires: { type: Date },
});

const model = mongoose.model('User', schema);

export default {
  apiPath: 'users',
  Model: model,
  hooks,
};
