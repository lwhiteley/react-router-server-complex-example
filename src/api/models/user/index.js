/**
 * Created by layton on 6/18/17.
 */
import mongoose, { Schema } from 'mongoose';
import sequenceGenerator from 'mongoose-sequence-plugin';

import hooks from './user.hooks';

const validatePattern = require('../../utils/validate-pattern');

const unique = true;
const required = true;
const trim = true;

const schema = new Schema({
  firstName: { type: String, required },
  lastName: { type: String, required },
  address: { type: Object },

  // Middleware Controlled props
  cellphone: { type: String },
  username: { type: String, unique, required },
  email: { type: String, unique, required },
  password: { type: String, required },

  isVerified: { type: Boolean },
  verifyToken: { type: String },
  verifyShortToken: { type: String },
  verifyExpires: { type: Date }, // or a long integer
  verifyChanges: {}, // an object (key-value map), e.g. { field: "value" }
  resetToken: { type: String },
  resetShortToken: { type: String },
  resetExpires: { type: Date },
  preferredComm: { type: String },

  isEnabled: {
    type: Boolean,
    default: true,
  },
  role: {
    required,
    type: String,
    trim,
    validate: validatePattern('isTitle'),
  },
  permissions: [],
});

schema.plugin(sequenceGenerator, {
  field: 'accountNumber',
  startAt: 1000000000,
  maxSaveRetries: 2,
});

const Model = mongoose.model('User', schema);

export default {
  apiPath: 'users',
  service: {
    Model,
  },
  hooks,
};
