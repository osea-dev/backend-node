import cors, { CorsOptions } from 'cors';
import { RequestHandler } from 'express';
// import SuperTokens from 'supertokens-node';

export const corsMiddleware = (): RequestHandler => {
  // Refer to the docs on what works for your use cases. https://github.com/expressjs/cors#readme
  const whitelist: Array<string | RegExp> = [];

  if (process.env.NODE_ENV !== 'production') {
    whitelist.push(/localhost/);
  }

  const corsOptions: CorsOptions = {
    origin: whitelist,
    // allowedHeaders: ['content-type', ...SuperTokens.getAllCORSHeaders()],
    credentials: true,
  };

  return cors(corsOptions);
};