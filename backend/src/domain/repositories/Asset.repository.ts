import { Asset } from '../models/Asset';

export interface AssetRepository {
  create(asset: Asset): Promise<Asset>;

  findByClientId(clienteId: string): Promise<Asset[]>;

  findAll(): Promise<Asset[]>;
}
