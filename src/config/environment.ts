'use strict';
import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../utils/logger';

// Load environment variables from .env file, where API keys and passwords are configured
if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
export const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const SERVER_URI = process.env.SERVER_URI || 'http://localhost';
export const SERVER_PORT = process.env.SERVER_PORT || 3000;

export const AUTH_ADMIN_SRV_URI = process.env.AUTH_ADMIN_SRV_URI;
export const AUTH_ADMIN_SRV_PORT = process.env.AUTH_ADMIN_SRV_PORT;

export const AUTH_SRV_URI = process.env.AUTH_SRV_URI;
export const AUTH_SRV_PORT = process.env.AUTH_SRV_PORT;

export const CLIENT_SECRET = process.env.CLIENT_DEV_SECRET;

if (!CLIENT_SECRET) {
  logger.error('No client secret. Set CLIENT_SECRET environment variable.');
  process.exit(1);
}
