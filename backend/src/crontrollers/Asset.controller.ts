import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateAsset } from '../application/usecases/asset/createAsset.usecase';
import { assetSchema } from '../schemas/asset.schema';
import { ListAssetsByClient } from '../application/usecases/asset/listAssetByClient.usecase';
import { ListAssets } from '../application/usecases/asset/listAsset.usecase';

export class AssetController {
  constructor(
    private createAsset: CreateAsset,
    private listAssets: ListAssetsByClient,
    private listAllAssets: ListAssets,
  ) {}

  public registerRoutes(app: FastifyInstance): void {
    app.post('/assets', async (req: FastifyRequest, res: FastifyReply) => {
      console.log('Corpo recebido:', req.body);

      const parsed = assetSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.code(400).send({ error: parsed.error.errors });
      }

      const data = parsed.data;

      const asset = await this.createAsset.execute(data);

      return res.code(201).send(asset);
    });

    app.get('/assets', async (req: FastifyRequest, res: FastifyReply) => {
      const clientId = (req.query as { clientId?: string }).clientId;

      if (!clientId) {
        return res.code(400).send({ error: 'clientId query parameter is required' });
      }

      const assets = await this.listAssets.execute(clientId);

      if (!assets || assets.length === 0) {
        return res.code(404).send({ error: 'No assets found' });
      }

      return res.code(200).send(assets);
    });

    app.get('/list-asset', async (_req: FastifyRequest, res: FastifyReply) => {
      const assets = await this.listAllAssets.execute();

      if(!assets) {
        return res.status(404).send({ error: 'No assets found' });
      }

      return res.code(200).send(assets);
    });
  }

}
