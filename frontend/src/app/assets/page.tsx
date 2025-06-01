'use client';

import { useEffect, useState } from 'react';
import { api } from '../api/api';

interface Client {
  client_id: string;
  client_name: string;
}

interface Asset {
  asset_id: string;
  asset_name: string;
  currentValue: number;
}

export default function AssetsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');

  useEffect(() => {
    const fetchClients = async () => {
      const res = await api.get('/clients');
      setClients(res.data);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!selectedClient) return;
      const res = await api.get(`/clients/${selectedClient}/assets`);
      setAssets(res.data);
    };
    fetchAssets();
  }, [selectedClient]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Ativos por Cliente</h1>

      <select
        className="p-2 border rounded"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
      >
        <option value="">Selecione um cliente</option>
        {clients.map((client) => (
          <option key={client.client_id} value={client.client_id}>
            {client.client_name}
          </option>
        ))}
      </select>

      {assets.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr>
              <th>Nome do Ativo</th>
              <th>Valor Atual</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.asset_id}>
                <td>{asset.asset_name}</td>
                <td>R$ {asset.currentValue.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
