import mongoose, { Schema } from 'mongoose';
import hooks from './roles.hooks';
import filters from './roles.filters';

const validatePattern = require('../../utils/validate-pattern');

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageMessages',
  'manageRoles',
  'manageSettings',
];

const unique = true;
const required = true;
const trim = true;

const schema = new Schema({
  role: {
    type: String,
    required,
    unique,
    trim,
    validate: validatePattern('isTitle'),
  },
  permissions: [
    {
      type: String,
      enum: sitePermissions,
    },
  ],
});

const Model = mongoose.model('Role', schema);

export default {
  apiPath: 'roles',
  service: {
    Model,
  },
  hooks,
  filters,
};
