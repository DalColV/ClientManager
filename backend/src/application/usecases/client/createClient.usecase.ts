import { ClientRepository } from '../../../domain/repositories/Client.repository';
import { Client } from '../../../domain/models/Client';
import { randomUUID } from 'crypto';

export class CreateClient {
  constructor(private repo: ClientRepository) {}

  async execute(data: Omit<Client, 'client_id'>): Promise<Client> {
    return this.repo.create({ ...data, client_id: randomUUID() });
  }
}
