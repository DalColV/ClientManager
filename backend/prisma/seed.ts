import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.client.createMany({
    data: [
      { client_id: 'cli1', client_name: 'Cliente 1', email: 'cliente1@email.com', status: true },
      { client_id: 'cli2', client_name: 'Cliente 2', email: 'cliente2@email.com', status: false },
      { client_id: 'cli3', client_name: 'Cliente 3', email: 'cliente3@email.com', status: true },
      { client_id: 'cli4', client_name: 'Cliente 4', email: 'cliente4@email.com', status: true },
      { client_id: 'cli5', client_name: 'Cliente 5', email: 'cliente5@email.com', status: false },
      { client_id: 'cli6', client_name: 'Cliente 6', email: 'cliente6@email.com', status: true },
      { client_id: 'cli7', client_name: 'Cliente 7', email: 'cliente7@email.com', status: true },
      { client_id: 'cli8', client_name: 'Cliente 8', email: 'cliente8@email.com', status: false },
      { client_id: 'cli9', client_name: 'Cliente 9', email: 'cliente9@email.com', status: true },
      { client_id: 'cli10', client_name: 'Cliente 10', email: 'cliente10@email.com', status: true },
    ],
    skipDuplicates: true,
  });

  await prisma.asset.createMany({
    data: [
      { asset_id: 'ass1', asset_name: 'Ativo 1', currentValue: 1000.50, clientId: 'cli1' },
      { asset_id: 'ass2', asset_name: 'Ativo 2', currentValue: 2000.00, clientId: 'cli2' },
      { asset_id: 'ass3', asset_name: 'Ativo 3', currentValue: 3000.75, clientId: 'cli3' },
      { asset_id: 'ass4', asset_name: 'Ativo 4', currentValue: 400.10, clientId: 'cli4' },
      { asset_id: 'ass5', asset_name: 'Ativo 5', currentValue: 1500.00, clientId: 'cli5' },
      { asset_id: 'ass6', asset_name: 'Ativo 6', currentValue: 2500.00, clientId: 'cli6' },
      { asset_id: 'ass7', asset_name: 'Ativo 7', currentValue: 3500.00, clientId: 'cli7' },
      { asset_id: 'ass8', asset_name: 'Ativo 8', currentValue: 4500.00, clientId: 'cli8' },
      { asset_id: 'ass9', asset_name: 'Ativo 9', currentValue: 5500.00, clientId: 'cli9' },
      { asset_id: 'ass10', asset_name: 'Ativo 10', currentValue: 6500.00, clientId: 'cli10' },
    ],
    skipDuplicates: true,
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
