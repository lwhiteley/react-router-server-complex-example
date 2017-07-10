/**
 * Created by layton on 7/10/17.
 */

import forEach from 'lodash/forEach';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';

export default (formSetup, values) => {
  if (!isPlainObject(get(formSetup, 'fields'))) {
    return formSetup;
  }
  forEach(formSetup.fields, (value, key) => {
    if (isPlainObject(get(formSetup, `fields.${key}`)) && get(values, `${key}`)) {
      formSetup.fields[key].value = values[key];
    }
  });
  return formSetup;
};
