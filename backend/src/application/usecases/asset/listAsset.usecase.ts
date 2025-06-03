import { AssetRepository } from '../../../domain/repositories/Asset.repository';
import { Asset } from '../../../domain/models/Asset';

export class ListAssets {
  constructor(private assetRepository: AssetRepository) {}

  async execute(): Promise<Asset[]> {
    return await this.assetRepository.findAll();
  }
}
