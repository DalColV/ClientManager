import { FastifyInstance } from 'fastify';
import { prisma } from '../infra/database/repositories/prisma/client';

export async function registerRoutes(fastify: FastifyInstance) {
  fastify.get('/test', async (request, reply) => {
    try {
      const clients = await prisma.client.findMany();
      return reply.status(200).send(clients);
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send({ error: 'Failed to fetch clients' });
    }
  });
}
