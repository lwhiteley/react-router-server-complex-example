import express from 'express';
import restify from 'express-restify-mongoose';
import models from './models';
import config from '../config/server';

const router = express.Router();

const restConfig = typeof config.rest === 'object' ? config.rest : {};
delete restConfig.name;

Object.values(models).forEach((data) => {
    const modelConfig = Object.assign({}, restConfig, data.config || {});
    restify.serve(router, data.model, modelConfig);
});

export default router;