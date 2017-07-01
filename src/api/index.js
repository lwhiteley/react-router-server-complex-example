import service from 'feathers-mongoose';
import plural from 'plural';
import get from 'lodash/get';
import omit from 'lodash/omit';
import models from './models';
// import config from '../config/server';

export default () => {
  return function api() {
    const app = this;
    return Object.values(models).forEach((data) => {
      data.apiPath = data.apiPath || plural(get(data, 'Model.modelName'));
      data.apiPath = data.apiPath.toLowerCase();
      const serviceData = omit(data, ['apiPath', 'hooks']);
      app.use(`${data.apiPath}`, service(serviceData));
      if (data.hooks) data.hooks(app, data);
    });
  };
};
