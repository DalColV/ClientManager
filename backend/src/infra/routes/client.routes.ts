import { FastifyInstance } from 'fastify';
import { CreateClient } from '../../application/usecases/client/createClient.usecase';
import { ListClients } from '../../application/usecases/client/listClient.usecase';
import { ClientController } from '../../crontrollers/Client.controller';
import { ClientRepositoryImpl } from '../repositories/Client.repository';
import { UpdateClient } from '../../application/usecases/client/updateClient.usecase';
import { DeleteClient } from '../../application/usecases/client/deleteClient.usecase';

export function registerClientRoutes(app: FastifyInstance) {
  console.log('Registrando rotas de clients...');

  const repo = new ClientRepositoryImpl();
  const createClient = new CreateClient(repo);
  const listClients = new ListClients(repo);
  const updateClient = new UpdateClient(repo);
  const deleteClient = new DeleteClient(repo);

  const controller = new ClientController(createClient, listClients,updateClient, deleteClient);
  controller.registerRoutes(app);
}
