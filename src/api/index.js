import createService from 'feathers-mongoose';
import plural from 'plural';
import get from 'lodash/get';
import models from './models';

export default () => {
  return function api() {
    const app = this;
    return Object.values(models).forEach((data) => {
      data.apiPath = data.apiPath || plural(get(data, 'Model.modelName'));
      data.apiPath = data.apiPath.toLowerCase();

      app.use(`${data.apiPath}`, createService(data.service));

      const service = app.service(data.apiPath);

      if (data.hooks) {
        service.hooks(data.hooks);
      }

      if (service.filter && data.filters) {
        service.filter(data.filters);
      }
    });
  };
};
