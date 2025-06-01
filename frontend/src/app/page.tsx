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

export default function Home() {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Bem-vindo ao sistema de gerenciamento de investimentos da ANKA TECH
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24</div>
            <p className="text-xs text-slate-600 mt-1">clientes ativos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Ativos Gerenciados
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">86</div>
            <p className="text-xs text-slate-600 mt-1">ativos em carteira</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Valor Total
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              R$ 4.325.642,00
            </div>
            <p className="text-xs text-slate-600 mt-1">em investimentos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-emerald-600" />
              <span>Gestão de Clientes</span>
            </CardTitle>
            <CardDescription>Cadastre e gerencie seus clientes</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-600 mb-4">
              Acesse o módulo de clientes para cadastrar novos clientes, editar
              informações e visualizar detalhes.
            </p>
            <Button asChild>
              <Link href="/clients" className="w-full">
                Acessar Clientes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <span>Ativos Financeiros</span>
            </CardTitle>
            <CardDescription>
              Visualize e gerencie ativos por cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-slate-600 mb-4">
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
