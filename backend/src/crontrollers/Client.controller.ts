import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateClient } from '../application/usecases/client/createClient.usecase';
import { ListClients } from '../application/usecases/client/listClient.usecase';
import { UpdateClient } from '../application/usecases/client/updateClient.usecase';
import { DeleteClient } from '../application/usecases/client/deleteClient.usecase';
import { clientSchema } from '../../src/schemas/client.schema';

interface UpdateClientParams {
  id: string;
}

interface DeleteClientParams {
  id: string;
}

export class ClientController {
  constructor(
    private createClient: CreateClient,
    private listClients: ListClients,
    private updateClient: UpdateClient,
    private deleteClient: DeleteClient
  ) {}

  public registerRoutes(app: FastifyInstance): void {
    app.post('/client', async (req, res) => {
      console.log('Corpo recebido:', req.body);

      const parsed = clientSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.code(400).send({ error: parsed.error.errors });
      }

      const data = parsed.data;

      const client = await this.createClient.execute(data);

      return res.code(201).send(client);
    });

    app.get('/client', async (_req: FastifyRequest, res: FastifyReply) => {
      const clients = await this.listClients.execute();

      if (!clients) {
        return res.status(404).send({ error: 'No clients found' });
      }

      return res.code(200).send(clients);
    });

    app.put<{ Params: UpdateClientParams }>('/client/:id', async (req, res) => {
      const { id } = req.params;

      console.log('Updating client:', id, 'with data:', req.body);

      const parsed = clientSchema.partial().safeParse(req.body);

      if (!parsed.success) {
        return res.code(400).send({ error: parsed.error.errors });
      }

      const data = parsed.data;

      const updatedClient = await this.updateClient.execute(id, data);

      return res.code(200).send(updatedClient);
    });

    app.delete<{ Params: DeleteClientParams }>(
      '/client/:id',
      async (req, res) => {
        const { id } = req.params;

        console.log('Deleting client:', id);

        await this.deleteClient.execute(id);

        return res.code(204).send();
      }
    );
  }
}
