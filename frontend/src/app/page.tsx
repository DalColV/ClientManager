'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { BarChart3, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { api } from '../app/api/api';

export default function Home() {
  const [totalClients, setTotalClients] = useState(0);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const clientsRes = await api.get('/client');
        setTotalClients(clientsRes.data.length);

        const assetsRes = await api.get('/list-asset');
        setTotalAssets(assetsRes.data.length);

        const total = assetsRes.data.reduce(
          (acc: number, asset: { currentValue: number }) => acc + asset.currentValue,
          0
        );
        setTotalValue(total);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-700 mt-1">
            Bem-vindo ao sistema de gerenciamento de investimentos da ANKA TECH
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalClients}
            </div>
            <p className="text-xs text-slate-700 mt-1">clientes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Ativos Gerenciados
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {totalAssets}
            </div>
            <p className="text-xs text-slate-700 mt-1">ativos em carteira</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Valor Total
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {`R$ ${totalValue.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
              })}`}
            </div>
            <p className="text-xs text-slate-700 mt-1">em investimentos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-900">
              <Users className="h-5 w-5 text-emerald-600" />
              <span>Gestão de Clientes</span>
            </CardTitle>
            <CardDescription className="text-slate-700">
              Cadastre e gerencie seus clientes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-700 mb-4">
              Acesse o módulo de clientes para cadastrar novos clientes, editar
              informações e visualizar detalhes.
            </p>
            <Button asChild>
              <Link href="/client" className="w-full">
                Acessar Clientes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-slate-900">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Ativos Financeiros</span>
            </CardTitle>
            <CardDescription className="text-slate-700">
              Visualize e gerencie ativos por cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-700 mb-4">
              Acesse o módulo de ativos para visualizar as alocações por cliente
              e gerenciar os investimentos.
            </p>
            <Button asChild>
              <Link href="/assets" className="w-full">
                Acessar Ativos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
