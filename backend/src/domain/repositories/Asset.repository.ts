import { Asset } from '../models/Asset';

export interface AssetRepository {
  create(asset: Asset): Promise<Asset>;

  findByClientId(clienteId: number): Promise<Asset[]>;

  findAll(): Promise<Asset[]>;
}
