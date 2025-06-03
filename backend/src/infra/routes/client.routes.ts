import { FastifyInstance } from 'fastify';
import { CreateClient } from '../../application/usecases/client/createClient.usecase';
import { ListClients } from '../../application/usecases/client/listClient.usecase';
import { UpdateClient } from '../../application/usecases/client/updateClient.usecase';
import { DeleteClient } from '../../application/usecases/client/deleteClient.usecase';
import { ListAssets } from '../../application/usecases/asset/listAsset.usecase';
import { CreateAsset } from '../../application/usecases/asset/createAsset.usecase';
import { ClientController } from '../../crontrollers/Client.controller';
import { AssetController } from '../../crontrollers/Asset.controller';
import { ClientRepositoryImpl } from '../repositories/Client.repository';
import { AssetRepositoryImpl } from '../repositories/Asset.repository';
import { ListAssetsByClient } from '../../application/usecases/asset/listAssetByClient.usecase';

export function registerClientRoutes(app: FastifyInstance) {
  console.log('Registrando rotas de clients...');

  const clientRepo = new ClientRepositoryImpl();
  const createClient = new CreateClient(clientRepo);
  const listClients = new ListClients(clientRepo);
  const updateClient = new UpdateClient(clientRepo);
  const deleteClient = new DeleteClient(clientRepo);

  const clientController = new ClientController(
    createClient,
    listClients,
    updateClient,
    deleteClient
  );
  clientController.registerRoutes(app);
}

export function registerAssetRoutes(app: FastifyInstance) {
  console.log('Registrando rotas de assets...');

  const assetRepo = new AssetRepositoryImpl();
  const createAsset = new CreateAsset(assetRepo);
  const listAssets = new ListAssetsByClient(assetRepo);
  const listAllAssets = new ListAssets(assetRepo);

  const assetController = new AssetController(
    createAsset,
    listAssets,
    listAllAssets
  );
  assetController.registerRoutes(app);
}

export function registerAllRoutes(app: FastifyInstance) {
  registerClientRoutes(app);
  registerAssetRoutes(app);
}
