import Fastify from 'fastify';
import { registerRoutes } from './routes';

const fastify = Fastify({ logger: true });

async function start() {
  try {
    await fastify.register(registerRoutes);

    await fastify.listen({ port: 3000 });
    fastify.log.info('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
