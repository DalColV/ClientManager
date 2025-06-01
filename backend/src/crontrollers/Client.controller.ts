import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateClient } from '../application/usecases/client/createClient.usecase';
import { ListClients } from '../application/usecases/client/listClient.usecase';
import { clientSchema } from '../../src/schemas/client.schema';
import { AppError } from '../shared/errors/Aplication.errors';

export class ClientController {
  constructor(
    private createClient: CreateClient,
    private listClients: ListClients
  ) {}

  public registerRoutes(app: FastifyInstance): void {
    app.post('/clients', async (req: FastifyRequest, res: FastifyReply) => {
      try {
        const data = clientSchema.parse(req.body);
        const client = await this.createClient.execute(data);
        return res.code(201).send(client);
      } catch (error) {
        const status = error instanceof AppError ? error.statusCode : 400;
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        return res.status(status).send({ error: message });
      }
    });

    app.get('/clients', async (_req: FastifyRequest, res: FastifyReply) => {
      try {
        const clients = await this.listClients.execute();
        return res.code(200).send(clients);
      } catch (error) {
        return res.status(500).send({ error: 'Internal server error' });
      }
    });
  }
}
