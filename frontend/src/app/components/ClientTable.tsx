'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Edit, Trash2, Users, Mail, Check, X } from 'lucide-react';
import { api } from '../api/api';

interface Client {
  client_id: string;
  client_name: string;
  email: string;
  status: boolean;
  created_at?: string;
}

export function ClientTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Client>>({});

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await api.get('/client');
        setClients(res.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const handleDelete = async (clientId: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await api.delete(`/client/${clientId}`);
        setClients(clients.filter((c) => c.client_id !== clientId));
      } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao excluir cliente');
      }
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client.client_id);
    setEditForm({
      client_name: client.client_name,
      email: client.email,
      status: client.status,
    });
  };

  const handleSaveEdit = async (clientId: string) => {
    try {
      const res = await api.put(`/client/${clientId}`, editForm);
      setClients(
        clients.map((c) =>
          c.client_id === clientId ? { ...c, ...res.data } : c
        )
      );
      setEditingClient(null);
      setEditForm({});
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Erro ao atualizar cliente');
    }
  };

  const handleCancelEdit = () => {
    setEditingClient(null);
    setEditForm({});
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-slate-900">
          <Users className="h-5 w-5 text-emerald-600" />
          <span>Lista de Clientes</span>
        </CardTitle>
        <CardDescription className="text-gray-700">
          {clients.length} cliente{clients.length !== 1 ? 's' : ''} cadastrado
          {clients.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Nenhum cliente cadastrado</p>
          </div>
        ) : (
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Nome</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.client_id}>
                    <TableCell className="font-medium">
                      {editingClient === client.client_id ? (
                        <Input
                          value={editForm.client_name || ''}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              client_name: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      ) : (
                        client.client_name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingClient === client.client_id ? (
                        <Input
                          type="email"
                          value={editForm.email || ''}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                          className="w-full"
                        />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span>{client.email}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingClient === client.client_id ? (
                        <Select
                          value={editForm.status?.toString()}
                          onValueChange={(value) =>
                            setEditForm({
                              ...editForm,
                              status: value === 'true',
                            })
                          }
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Ativo</SelectItem>
                            <SelectItem value="false">Inativo</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Badge
                          variant={client.status ? 'default' : 'secondary'}
                        >
                          {client.status ? 'Ativo' : 'Inativo'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {editingClient === client.client_id ? (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleSaveEdit(client.client_id)
                                  }
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Salvar alterações</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleCancelEdit}
                                  className="text-slate-700 hover:text-slate-900"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Cancelar edição</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEdit(client)}
                                  className="text-slate-700 hover:text-slate-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Editar cliente</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDelete(client.client_id)}
                                  className="text-slate-700 hover:text-red-600"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Excluir cliente</p>
                              </TooltipContent>
                            </Tooltip>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        )}
      </CardContent>
    </Card>
  );
}
