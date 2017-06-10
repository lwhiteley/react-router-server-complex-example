import service from 'feathers-mongoose';
import plural from 'plural';
import get from 'lodash/get';
import omit from 'lodash/omit';
import models from './models';
// import config from '../config/server';

export default (app) => {
  return Object.values(models).forEach((data) => {
    const apiPath = data.apiPath || plural(get(data, 'Model.modelName'));
    const serviceData = omit(data, ['apiPath']);
    app.use(`${apiPath.toLowerCase()}`, service(serviceData));
  });
};
