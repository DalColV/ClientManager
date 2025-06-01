import { FastifyInstance } from "fastify";
import { CreateClient } from "../../application/usecases/client/createClient.usecase";
import { ListClients } from "../../application/usecases/client/listClient.usecase";
import { ClientController } from "../../crontrollers/Client.controller";
import { ClientRepositoryImpl } from "../repositories/Client.repository";

export function registerClientRoutes(app: FastifyInstance) {
  const repo = new ClientRepositoryImpl();
  const createClient = new CreateClient(repo);
  const listClients = new ListClients(repo);

  const controller = new ClientController(createClient, listClients);
  controller.registerRoutes(app);
}