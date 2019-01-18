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

export const SERVER_URI = process.env.SERVER_URI;
if (!SERVER_URI) {
  logger.error('No server uri. Set SERVER_URI environment variable.');
  process.exit(1);
}
export const SERVER_PORT = process.env.SERVER_PORT;
if (!SERVER_PORT) {
  logger.error('No server port. Set SERVER_PORT environment variable.');
  process.exit(1);
}

export const AUTH_ADMIN_SRV_URI = process.env.AUTH_ADMIN_SRV_URI;
if (!AUTH_ADMIN_SRV_URI) {
  logger.error('No auth admin server uri. Set AUTH_ADMIN_SRV_URI environment variable.');
}
export const AUTH_ADMIN_SRV_PORT = process.env.AUTH_ADMIN_SRV_PORT;
if (!AUTH_ADMIN_SRV_URI) {
  logger.error('No auth admin server port. Set AUTH_ADMIN_SRV_PORT environment variable.');
}

export const AUTH_SRV_URI = process.env.AUTH_SRV_URI;
if (!AUTH_SRV_URI) {
  logger.error('No auth server uri. Set AUTH_SRV_URI environment variable.');
}
export const AUTH_SRV_PORT = process.env.AUTH_SRV_PORT;
if (!AUTH_SRV_PORT) {
  logger.error('No auth server port. Set AUTH_SRV_PORT environment variable.');
}

// Session store
export const REDIS_HOST = process.env.REDIS_HOST;
if (!REDIS_HOST) {
  logger.error('No Redis uri. Set REDIS_HOST environment variable.');
  process.exit(1);
}
export const REDIS_PORT = process.env.REDIS_PORT;
if (!REDIS_PORT) {
  logger.error('No Redis port. Set REDIS_PORT environment variable.');
  process.exit(1);
}

export const CLIENT_SECRET = process.env.CLIENT_DEV_SECRET;
if (!CLIENT_SECRET) {
  logger.error('No client secret. Set CLIENT_SECRET environment variable.');
  process.exit(1);
}
