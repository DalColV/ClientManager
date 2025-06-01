import { ClientRepository } from '../../../domain/repositories/Client.repository';
import { Client } from '../../../domain/models/Client';
import { randomUUID } from 'crypto';

interface CreateClientProps {
  client_name: string;
  email: string;
  status: boolean;
}

export class CreateClient {
  constructor(private clientRepo: ClientRepository) {}

  async execute(data: CreateClientProps): Promise<Client> {
    const client: Client = {
      ...data,
      client_id: randomUUID(),
    };

    return this.clientRepo.create(client);
  }
}
