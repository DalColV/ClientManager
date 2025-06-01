import Fastify from 'fastify';
import { registerClientRoutes } from '../infra/routes/client.routes';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });
app.register(cors, { origin: 'http://localhost:3001' });

registerClientRoutes(app);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
