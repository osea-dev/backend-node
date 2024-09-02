import { env } from "./config/environment.js";

import helmet from "helmet";
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import { maintenanceRouter } from "./modules/maintenance/routes/index.js";

import { corsMiddleware, errorMiddleware } from '@/middlewares/index.js';
// import { createTerminus } from "@godaddy/terminus";

const app = express();

(async () => {
    console.info(`${'='.repeat(30)}`);
    console.info(`NODE_ENV: ${env.NODE_ENV}`);
    console.info(`${'='.repeat(30)}`);

    // IMPORTANT:
    // In case your app is running behind a proxy, you should configure this.
    // Elastic Beanstalk instances for example has an nginx proxy by default.
    // Read more at https://expressjs.com/en/guide/behind-proxies.html
    app.set('trust proxy', true);

    // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-1012913186
    app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use(corsMiddleware());
    
    // app.use(['/api']);
    // app.use(createContextMiddleware());

    const routers: Router[] = [
        // IMPORTANT: Add app routers here
        maintenanceRouter,
        // authRouter,
        // userRouter,
      ];
    app.use(routers);
    app.use(errorMiddleware());

    const httpServer = http.createServer(app);

    // enable it when db for mysql was configured
    // createTerminus(httpServer, {
    //   async onSignal() {
    //     console.info('server is starting cleanup');
  
    //     return Promise.all([
    //       await db.destroy(),
    //       // await disconnectRedisClients(),
    //     ]);
    //   },
    // });

    httpServer.listen(env.PORT, () => {
        console.info(`Server is now up @ ${env.PORT}`);
      });
})();