import { AssetRepository } from '../../../domain/repositories/Asset.repository';
import { Asset } from '../../../domain/models/Asset';

export class ListAssetsByClient {
  constructor(private repo: AssetRepository) {}

  async execute(clientId: string): Promise<Asset[]> {
    return this.repo.findByClientId(clientId);
  }
}
