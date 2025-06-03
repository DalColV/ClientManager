import { ClientRepository } from '../../../domain/repositories/Client.repository';
import { Client } from '../../../domain/models/Client';

export class UpdateClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string, clientData: Partial<Client>): Promise<Client> {
    const clientToUpdate = {
      client_id: id,
      ...clientData,
    } as Client;

    return await this.clientRepository.update(clientToUpdate);
  }
}
