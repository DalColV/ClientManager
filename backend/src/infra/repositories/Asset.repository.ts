import { PrismaClient } from '@prisma/client';
import { Asset } from '../../domain/models/Asset';
import { AssetRepository } from '../../domain/repositories/Asset.repository';

export class AssetRepositoryImpl implements AssetRepository {
  constructor(private prisma: PrismaClient) {}

  async create(asset: Asset): Promise<Asset> {
    return this.prisma.asset.create({
      data: {
        asset_id: asset.asset_id, 
        asset_name: asset.asset_name,
        currentValue: asset.currentValue,
        clientId: asset.clientId,
      },
    });
  }

  async findByClientId(clientId: string): Promise<Asset[]> {
    return this.prisma.asset.findMany({
      where: { clientId },
    });
  }

  async findAll(): Promise<Asset[]> {
    return this.prisma.asset.findMany();
  }
}
