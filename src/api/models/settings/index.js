import mongoose, { Schema } from 'mongoose';
import hooks from './settings.hooks';
import filters from './settings.filters';

const validatePattern = require('../../utils/validate-pattern');

const unique = true;
const required = true;
const trim = true;

const schema = new Schema({
  name: {
    type: String,
    trim,
    required,
    unique,
    validate: validatePattern('isTitle'),
  },
  value: {
    type: Schema.Types.Mixed,
    required,
  },
});

const Model = mongoose.model('Setting', schema);

export default {
  apiPath: 'settings',
  service: {
    Model,
  },
  hooks,
  filters,
};
