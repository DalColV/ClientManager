import { ClientRepository } from '../../domain/repositories/Client.repository';
import { Client } from '../../domain/models/Client';
import { prisma } from '../../infra/database/prisma';

export class ClientRepositoryImpl implements ClientRepository {
  async create(client: Client): Promise<Client> {
    return prisma.client.create({ data: client });
  }

  async update(client: Client): Promise<Client> {
    return prisma.client.update({
      where: { client_id: client.client_id },
      data: {
        client_name: client.client_name,
        email: client.email,
        status: client.status,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.client.delete({ where: { client_id: id } });
  }

  async list(): Promise<Client[]> {
    return prisma.client.findMany();
  }
}
