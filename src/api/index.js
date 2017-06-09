import service from 'feathers-mongoose';
import plural from 'plural';
import get from 'lodash/get';
import models from './models';

export default (app) => {
    return Object.values(models).forEach((data) => {
        const apiPath = data.apiPath || plural(get(data, 'Model.modelName'));
        delete data.apiPath;
        app.use(apiPath.toLowerCase(), service(data));
    });
};