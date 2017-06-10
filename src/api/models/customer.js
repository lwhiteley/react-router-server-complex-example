import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  name: { type: String, required: true },
  comment: { type: String },
});

const model = mongoose.model('Customer', schema);

export default {
  apiPath: 'customers',
  Model: model,
};
