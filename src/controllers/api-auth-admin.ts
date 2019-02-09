import { NextFunction, Request, Response } from 'express';

import * as env from '../config/environment';
import * as axiosReq from '../services/axios-request';

const baseURL = `${env.AUTH_ADMIN_SRV_URI}:${env.AUTH_ADMIN_SRV_PORT}`;

export let postSignUp = (req: Request, res: Response, next: NextFunction) => {
    const config = axiosReq.configRequest(req, baseURL, '/account/signup', 'post');
    return axiosReq.doRequest(null, config, req, res, next);
};

export let getList = (req: Request, res: Response, next: NextFunction) => {
    const config = axiosReq.configRequest(req, baseURL, '/account/list', 'get');
    return axiosReq.doRequest(null, config, req, res, next);
};

export let getAccount = (req: Request, res: Response, next: NextFunction) => {
    const config = axiosReq.configRequest(req, baseURL, '/account', 'get');
    return axiosReq.doRequest(null, config, req, res, next);
};

export let putAccount = (req: Request, res: Response, next: NextFunction) => {
    const config = axiosReq.configRequest(req, baseURL, '/account', 'put');
    return axiosReq.doRequest(null, config, req, res, next);
};

export let deleteAccount = (req: Request, res: Response, next: NextFunction) => {
    const config = axiosReq.configRequest(req, baseURL, '/account', 'delete');
    return axiosReq.doRequest(null, config, req, res, next);
};
