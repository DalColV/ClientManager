'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import { Users, UserPlus } from 'lucide-react';
import { ClientForm } from '@/app/components/ClientForm';
import { ClientTable } from '@/app/components/ClientTable';

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestão de Clientes
          </h1>
          <p className="text-slate-600 mt-1">
            Gerencie seus clientes e suas informações
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-medium text-slate-700">
            Client Management
          </span>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="bg-white">
          <CardTitle className="flex items-center space-x-2 text-slate-900">
            <Users className="h-5 w-5 text-emerald-600" />
            <span>Clientes</span>
          </CardTitle>
          <CardDescription className='text-slate-600'>
            Cadastre novos clientes e gerencie os existentes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="list" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Lista de Clientes</span>
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Novo Cliente</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-6">
              <ClientTable />
            </TabsContent>

            <TabsContent value="add" className="mt-6">
              <ClientForm onSuccess={() => setActiveTab('list')} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
