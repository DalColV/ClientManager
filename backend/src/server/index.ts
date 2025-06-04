import Fastify from 'fastify';
import { registerAssetRoutes, registerClientRoutes } from '../infra/routes/client.routes';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });
app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: false, 
});

registerClientRoutes(app);
registerAssetRoutes(app);


app.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
