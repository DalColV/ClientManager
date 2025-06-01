import { z } from 'zod';

export const assetSchema = z.object({
  asset_name: z.string().min(1, 'Asset name is required'),
  currentValue: z.number().positive('Asset value must be positive'),
  clientId: z.string().uuid('Invalid client ID format'),
});

export type AssetSchema = z.infer<typeof assetSchema>;
