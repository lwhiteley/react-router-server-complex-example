import mongoose, {Schema} from 'mongoose';

const schema =  new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
});

const model = mongoose.model('Customer', schema);

export default {
  apiPath: 'customers',
  Model: model,
  paginate: {
    default: 2,
    max: 4
  }
};