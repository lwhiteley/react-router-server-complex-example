import mongoose, {Schema} from 'mongoose';

const schema =  new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
});

const model = mongoose.model('Customer', schema);
const config = {};

export default {
    model,
    config
};