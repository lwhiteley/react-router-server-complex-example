import mongoose, {Schema} from 'mongoose';
import controllers from './controllers';

const schema =  new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
});

const model = mongoose.model('Customer', schema);

/**
 * Specify express-restify-mongoose option for this model
 * https://florianholzapfel.github.io/express-restify-mongoose/#reference
 */
const config = {};

export default {
    model,
    config,
    controllers
};