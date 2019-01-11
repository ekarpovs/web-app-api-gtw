'use strict';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { NextFunction, Request, Response } from 'express';

import * as env from '../config/environment';

export let configRequest = (req: Request, base: string, route: string, type: string): AxiosRequestConfig => {
  return  {
      baseURL: base,
      data: req.body,
      headers: { 'Content-Type': 'application/json' },
      method: type,
      params: req.query,
      url: route
  };
};

export let doRequest = (handler: any, config: AxiosRequestConfig,
                        req: Request, res: Response, next: NextFunction): any => {

  const handleResponse = handler ? handler : (response: AxiosResponse) => {
      return res.status(response.status).json(response.data);
  };

  const handleError = (error: AxiosError) => {
      if (error.response) {
          return res.status(error.response.status).json(error.response.data);
      } else {
          return res.status(400).json(error.message);
      }
  };

  axios(config)
  .then(handleResponse)
  .catch(handleError);
};
