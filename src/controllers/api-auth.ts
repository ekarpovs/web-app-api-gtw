import { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

import * as env from '../config/environment';
import * as axiosReq from '../services/axios-request';

const baseURL = `${env.AUTH_SRV_URI}:${env.AUTH_SRV_PORT}`;

export let postLogin = (req: Request, res: Response, next: NextFunction) => {
    // Will:
    // 1. Map and redirect the login request to auth service and get JWT
    // 2. Request authorization servise and get authorization data
    // 3. Save in a session the token and the data
    // 4. Response to an user with the session id and config data

    // Check request data
    if (!req.session) {
        return res.status(500).json('The user session does not exist');
    }

    const session = req.session;
    if ((session && session.email) && (session.email === req.body.email)) {
        return res.status(200).json('The user alraedy logged in');
    }
    const handleResponse = (response: AxiosResponse) => {
        // Add JWT token to a user session
        session.token = response.data.accessToken;
        // Add authorization data to the session
        // req.session.crud = [
        //     {path: 'user', crud: {c: false, r: true, u: false, d: false}},
        //     {path: 'provider', crud: {c: false, r: true, u: false, d: false}}
        // ];
        session.save((err: any) => {
            const sessionId = session.id; // Will be passed as a request parameter.
            session.email = req.body.email;
            return res.status(response.status).json({sid: sessionId});
        });
    };

    const config = axiosReq.configRequest(req, baseURL, '/token/obtain', 'post');
    return axiosReq.doRequest(handleResponse, config, req, res, next);
};

export let postLogout = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session) {
        return res.status(200).json('The user is not logged in');
    }
    req.session.destroy((err: any) => {
        return res.status(200).json('The user is logged out');
    });
};
