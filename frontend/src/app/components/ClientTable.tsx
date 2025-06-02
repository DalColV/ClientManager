'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '../api/api';

interface Client {
  client_id: string;
  client_name: string;
  email: string;
  status: boolean;
}

export function ClientTable() {
  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await api.get('/clients');
      return res.data;
    },
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client: Client) => (
          <tr key={client.client_id}>
            <td>{client.client_name}</td>
            <td>{client.email}</td>
            <td>{client.status ? 'Ativo' : 'Inativo'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
