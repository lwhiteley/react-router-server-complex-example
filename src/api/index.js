import models from './models';
import service from 'feathers-mongoose';
import plural from 'plural';

export default (app) => {
    return Object.values(models).forEach((data) => {
        const apiPath = data.apiPath || plural(data.Model.modelName);
        delete data.apiPath;
        app.use(apiPath.toLowerCase(), service(data));
    });
};