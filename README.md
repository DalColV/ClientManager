# ClientManager 

Este projeto é uma aplicação full-stack desenvolvida para um escritório de investimentos fictício, com o objetivo de gerenciar clientes e exibir informações básicas de ativos financeiros. A aplicação é construída com uma stack em TypeScript, containerizada com Docker, e possui um backend em Fastify com Prisma para interagir com o banco de dados MySQL, além de um frontend em Next.js com componentes de UI do ShadCN. 

Funcionalidades:


Gerenciamento de Clientes: Operações CRUD para clientes (criar, editar, listar e deletar).
Listagem de Ativos: Exibição de uma lista estática de ativos financeiros (por exemplo, "Ação X", "Fundo TAL") com seus valores atuais.
Consulta individual por Cliente: traz todas as informações registradas sobr a carteira de ativos do cliente.
Containerização: Serviços de backend, frontend e banco de dados MySQL orquestrados via Docker Compose.
Validação: Validação de payloads com Zod no backend e frontend.
Interface de Usuário: Interface simples e funcional construída com Next.js, ShadCN, React Query, React Hook Form e Axios para interações com a API.

Stack:

Backend

Node.js com Fastify: Framework de servidor leve e performático.
Prisma ORM: Gerencia interações com o banco de dados MySQL.
Zod: Validação de esquemas para payloads de requisições.
MySQL: Banco de dados relacional.

Frontend

Next.js: Framework React para renderização no lado do servidor e geração de sites estáticos.
ShadCN: Componentes de UI reutilizáveis e personalizáveis para uma aparência consistente.
React Query: Gerencia busca e cache de dados do backend.
React Hook Form + Zod: Manipulação e validação de formulários.
Axios: Cliente HTTP para requisições à API.

DevOps

Docker Compose: Orquestra o serviço de backend, frontend e o banco de dados MySQL.
MySQL: Imagem oficial do Docker para o serviço de banco de dados.
