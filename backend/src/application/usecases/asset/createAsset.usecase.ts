import { Asset } from '../../../domain/models/Asset';
import { AssetRepository } from '../../../domain/repositories/Asset.repository';
import { AssetSchema } from '../../../schemas/asset.schema';

export class CreateAsset {
  constructor(private assetRepository: AssetRepository) {}

  async execute(data: AssetSchema): Promise<Asset> {
    const asset = await this.assetRepository.create({
      asset_id: '', 
      asset_name: data.asset_name,
      currentValue: data.currentValue,
      clientId: data.clientId,
    });
    return asset;
  }
}
