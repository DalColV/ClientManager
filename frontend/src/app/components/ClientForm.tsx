'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { clientSchema, ClientFormData } from '../lib/validation';
import { api } from '../api/api';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Switch } from '@/app/components/ui/switch';

interface ClientFormProps {
  onSuccess: () => void;
}

export function ClientForm({ onSuccess }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientFormData>({ resolver: zodResolver(clientSchema) });

  const onSubmit = async (data: ClientFormData) => {
    await api.post('/clients', data);
    reset();
    onSuccess(); 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Nome" {...register('client_name')} />
      {errors.client_name && (
        <p className="text-red-500">{errors.client_name.message}</p>
      )}

      <Input placeholder="Email" type="email" {...register('email')} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <div className="flex items-center gap-2">
        <label>Status</label>
        <Switch {...register('status')} />
      </div>

      <Button type="submit">Cadastrar</Button>
    </form>
  );
}
