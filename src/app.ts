import express from 'express';

import expressConfig from './config/express';
import setRoutes from './routes/routes';
// import logger from './utils/logger';

// Create Express server
const app = express();

// Express configuration
expressConfig(app);

// Define API routes.
setRoutes(app);

export default app;
