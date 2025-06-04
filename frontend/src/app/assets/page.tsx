'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Users,
  Home,
  Database,
} from 'lucide-react';
import { api } from '../api/api';
import Link from 'next/link';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';

interface Client {
  client_id: string;
  client_name: string;
  status: boolean;
}

interface Asset {
  asset_id: string;
  asset_name: string;
  currentValue: number;
  allocation?: number;
}

interface SystemAsset {
  asset_id: string;
  asset_name: string;
  asset_type: string;
  currentValue: number;
  risk_level: string;
  category: string;
  yield_rate: string;
}

export default function AssetsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [systemAssets, setSystemAssets] = useState<SystemAsset[]>([]);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [systemLoading, setSystemLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('client');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/client');
        setClients(res.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchSystemAssets = async () => {
      setSystemLoading(true);
      try {
        const res = await api.get('/list-asset');
        setSystemAssets(res.data);
      } catch (error) {
        console.error('Erro ao buscar ativos do sistema:', error);
      } finally {
        setSystemLoading(false);
      }
    };

    if (activeTab === 'system') {
      fetchSystemAssets();
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchAssets = async () => {
      if (!selectedClient) {
        setAssets([]);
        return;
      }

      setLoading(true);
      try {
        const res = await api.get(`/client/${selectedClient}/assets`);
        setAssets(res.data);
      } catch (error) {
        console.error('Erro ao buscar ativos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [selectedClient]);

  const selectedClientData = clients.find(
    (c) => c.client_id === selectedClient
  );
  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalSystemValue = systemAssets.reduce(
    (sum, asset) => sum + asset.currentValue,
    0
  );

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return 'default';
      case 'Médio':
        return 'secondary';
      case 'Alto':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Ativos por Cliente
          </h1>
          <p className="text-slate-700 mt-1">
            Visualize e gerencie as alocações de ativos dos seus clientes
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <div className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-emerald-600" />
            <span className="text-sm font-medium text-slate-700">
              Portfolio Overview
            </span>
          </div>
          <Button variant="default" size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="client" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Ativos por Cliente</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Catálogo de Ativos</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client" className="mt-6 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardHeader className="bg-white">
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <Users className="h-5 w-5 text-emerald-600" />
                <span>Seleção de Cliente</span>
              </CardTitle>
              <CardDescription className="text-slate-700">
                Escolha um cliente para visualizar seus ativos e alocações
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.client_id} value={client.client_id}>
                      <div className="flex items-center space-x-2">
                        <span>{client.client_name}</span>
                        <Badge
                          variant={client.status ? 'default' : 'secondary'}
                        >
                          {client.status ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedClientData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    Cliente Selecionado
                  </CardTitle>
                  <Users className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {selectedClientData.client_name}
                  </div>
                  <Badge
                    variant={
                      selectedClientData.status ? 'default' : 'secondary'
                    }
                    className="mt-2"
                  >
                    {selectedClientData.status ? 'Ativo' : 'Inativo'}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    Total de Ativos
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {assets.length}
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    ativos em carteira
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-700">
                    Valor Total
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(totalValue)}
                  </div>
                  <p className="text-xs text-slate-700 mt-1">
                    valor total da carteira
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedClient && (
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Ativos da Carteira</span>
                </CardTitle>
                <CardDescription className="text-slate-700">
                  Detalhamento dos ativos e valores atuais do cliente
                  selecionado
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : assets.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">
                          Nome do Ativo
                        </TableHead>
                        <TableHead className="font-semibold text-right">
                          Valor Atual
                        </TableHead>
                        <TableHead className="font-semibold text-right">
                          % da Carteira
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assets.map((asset) => {
                        const percentage =
                          totalValue > 0
                            ? (asset.currentValue / totalValue) * 100
                            : 0;
                        return (
                          <TableRow key={asset.asset_id}>
                            <TableCell className="font-medium">
                              {asset.asset_name}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              }).format(asset.currentValue)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge variant="outline" className="font-medium">
                                {percentage.toFixed(1)}%
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">
                      Nenhum ativo encontrado para este cliente
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="system" className="mt-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-900">
                <Database className="h-5 w-5 text-emerald-600" />
                <span>Catálogo de Ativos</span>
              </CardTitle>
              <CardDescription className="text-slate-700">
                Relação completa dos ativos disponíveis no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {systemLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
              ) : systemAssets.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">
                          Total de Ativos
                        </CardTitle>
                        <Database className="h-4 w-4 text-emerald-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {systemAssets.length}
                        </div>
                        <p className="text-xs text-slate-700 mt-1">
                          ativos disponíveis
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">
                          Valor Total
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          }).format(totalSystemValue)}
                        </div>
                        <p className="text-xs text-slate-700 mt-1">
                          patrimônio total
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-700">
                          Categorias
                        </CardTitle>
                        <PieChart className="h-4 w-4 text-emerald-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-slate-900">
                          {new Set(systemAssets.map((a) => a.category)).size}
                        </div>
                        <p className="text-xs text-slate-700 mt-1">
                          tipos de investimento
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">
                          Nome do Ativo
                        </TableHead>
                        <TableHead className="font-semibold">Tipo</TableHead>
                        <TableHead className="font-semibold">
                          Categoria
                        </TableHead>
                        <TableHead className="font-semibold">
                          Nível de Risco
                        </TableHead>
                        <TableHead className="font-semibold text-center">
                          Rentabilidade
                        </TableHead>
                        <TableHead className="font-semibold text-right">
                          Valor Atual
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemAssets.map((asset) => (
                        <TableRow key={asset.asset_id}>
                          <TableCell className="font-medium">
                            {asset.asset_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{asset.asset_type}</Badge>
                          </TableCell>
                          <TableCell className="text-slate-600">
                            {asset.category}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getRiskBadgeVariant(asset.risk_level)}
                            >
                              {asset.risk_level}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-medium text-emerald-600">
                            {asset.yield_rate}
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(asset.currentValue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <div className="text-center py-8">
                  <Database className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">
                    Nenhum ativo encontrado no sistema
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
