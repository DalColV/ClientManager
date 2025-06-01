import { ClientForm } from '../components/ClientForm';
import { ClientTable } from '../components/ClientTable';

export default function ClientsPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Clientes</h1>
      <ClientForm />
      <ClientTable />
    </div>
  );
}
