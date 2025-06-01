import { z } from 'zod';

export const clientSchema = z.object({
  client_name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  status: z.boolean(),
});

export type ClientFormData = z.infer<typeof clientSchema>;

export const assetSchema = z.object({
  asset_name: z.string().min(1, 'Nome do ativo é obrigatório'),
  currentValue: z.number().positive('O valor deve ser positivo'),
  clientId: z.string().uuid('ID do cliente inválido'),
});

export type AssetFormData = z.infer<typeof assetSchema>;
