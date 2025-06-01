import { ClientRepository } from '../../../domain/repositories/Client.repository';
import { Client } from '../../../domain/models/Client';

export class ListClients {
  constructor(private clientRepo: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.clientRepo.list();
  }
}
