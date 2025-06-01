import { z } from 'zod';

export const clientSchema = z.object({
  client_name: z.string().min(1),
  email: z.string().email(),
  status: z.boolean(),
});

export type ClientInput = z.infer<typeof clientSchema>;
