import Fastify from 'fastify';
import { registerClientRoutes } from '../infra/routes/client.routes';

const app = Fastify({ logger: true });

registerClientRoutes(app);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
