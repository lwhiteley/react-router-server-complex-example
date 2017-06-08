import express from 'express';
import restify from 'express-restify-mongoose';
import models from './models';
import config from '../config/server';

const router = express.Router();
const customRoutes = express.Router();

const restConfig = typeof config.rest === 'object' ? config.rest : {};
delete restConfig.name;

Object.values(models).forEach((data) => {
    const modelConfig = Object.assign({}, restConfig, data.config || {});
    const modelPath = restify.serve(router, data.model, modelConfig);
    if (data.controllers) {
        data.controllers.forEach((controller) => {
            if (typeof controller.action === 'function'){
                const apiMethod = typeof controller.method === 'string' ? controller.method : 'get';
                customRoutes[apiMethod.toLowerCase()](`${modelPath}/${controller.path || ''}`, controller.action);
            }
        });
    }

});

export default {
    router,
    customRoutes
};