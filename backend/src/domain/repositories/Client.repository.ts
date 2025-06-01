import { Client } from '../models/Client';

export interface ClientRepository {
  create(client: Client): Promise<Client>;

  update(client: Client): Promise<Client>;

  delete(id: string): Promise<void>;

  list(): Promise<Client[]>;
}
