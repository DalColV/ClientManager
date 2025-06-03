import { ClientRepository } from '../../../domain/repositories/Client.repository';

export class DeleteClient {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string): Promise<void> {
    return await this.clientRepository.delete(id);
  }
}
