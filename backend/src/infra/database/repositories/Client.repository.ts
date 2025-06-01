import { ClientRepository } from '../../../domain/repositories/Client.repository';
import { Client } from '../../../domain/models/Client';
import { prisma } from '../../database/repositories/prisma/client';

export class ClientRepositoryImpl implements ClientRepository {
  async create(data: Client): Promise<Client> {
    return prisma.client.create({ data });
  }

  async update(data: Client): Promise<Client> {
    return prisma.client.update({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.client.delete({ where: { client_id: id } });
  }

  async list(): Promise<Client[]> {
    return prisma.client.findMany();
  }
}
