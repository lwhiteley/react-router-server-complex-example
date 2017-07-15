/**
 * Created by layton on 7/14/17.
 */

import _ from 'lodash';

const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const isEnabled = require('../hooks/is-enabled');
const hasPermissionBoolean = require('../hooks/has-permission-boolean');


export default (opts = {}) => {
  const restrictToOwnerOpts = _.merge(
      { idField: '_id', ownerField: '_id' },
      opts.restrictToOwner,
    );
  const restrict = [
    authenticate(['jwt']),
    isEnabled(),
    commonHooks.unless(
            hasPermissionBoolean('manageUsers'),
            restrictToOwner(restrictToOwnerOpts)
        ),
  ];
  return restrict;
};
