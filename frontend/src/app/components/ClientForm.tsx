// frontend/src/app/components/ClientForm.tsx
'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { UserPlus, Building2 } from 'lucide-react';
import { api } from '../api/api';

interface ClientFormProps {
  onSuccess?: () => void;
}

export function ClientForm({ onSuccess }: ClientFormProps) {
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    status: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/client', formData);
      setFormData({ client_name: '', email: '', status: true });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert(
        'Erro ao processar cadastro. Verifique os dados e tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className='w-111'>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-slate-900">
          <Building2 className="h-5 w-5 text-emerald-600" />
          <span>Cadastro de Cliente</span>
        </CardTitle>
        <CardDescription className="text-slate-700">
          Preencha os campos obrigatórios para efetuar o cadastro no sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="client_name"
                className="text-sm font-medium text-slate-700"
              >
                Razão Social / Nome Completo *
              </Label>
              <Input
                id="client_name"
                type="text"
                value={formData.client_name}
                onChange={(e) =>
                  setFormData({ ...formData, client_name: e.target.value })
                }
                placeholder="Informe a razão social ou nome completo"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="exemplo@empresa.com.br"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-slate-700"
              >
                Status do Cadastro
              </Label>
              <div className="flex items-center space-x-3">
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, status: checked })
                  }
                />
                <Label
                  htmlFor="status"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  {formData.status ? 'Ativo' : 'Inativo'}
                </Label>
              </div>
            </div>

            <div className="flex">
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 min-w-[140px]"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <UserPlus className="h-4 w-4" />
                )}
                <span>{loading ? 'Processando...' : 'Cadastrar Cliente'}</span>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
