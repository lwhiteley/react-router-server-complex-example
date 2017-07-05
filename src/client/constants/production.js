import get from 'lodash/get';

module.exports = {
  baseUrl: get(process, 'env.BASE_URL'),
};
