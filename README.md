🌟 ClientManager

Uma aplicação full-stack moderna desenvolvida para um escritório de investimentos fictício, projetada para gerenciar clientes e exibir informações de ativos financeiros. Construída com TypeScript, containerizada com Docker, e composta por um backend em Fastify com Prisma para integração com MySQL e um frontend em Next.js com componentes de UI do ShadCN.


🚀 Visão Geral

O ClientManager é uma solução robusta que combina um backend eficiente e um frontend funcional para atender às necessidades de gerenciamento de clientes e ativos financeiros. A aplicação é 100% escrita em TypeScript, garantindo segurança de tipos e escalabilidade. Por isso o backend segue a Clean Archtecture + DDD.


✨ Funcionalidades


📋 Gerenciamento de Clientes: Operações CRUD completas (criar, listar, editar e deletar) para gerenciar informações de clientes (nome, e-mail, status - ativo/inativo).

💰 Listagem de Ativos: Exibição de uma lista estática de ativos financeiros (ex.: "Ação X", "Fundo TAL") com valores atuais.

🔍 Consulta por Cliente: Visualize todas as informações registradas sobre a carteira de ativos de um cliente específico.

🐳 Containerização: Backend, frontend e banco de dados MySQL orquestrados com Docker Compose.

✅ Validação: Uso de Zod para validação de payloads no backend e frontend.

🖼️ Interface de Usuário: Interface funcional e minimalista com Next.js, ShadCN, React Query, React Hook Form e Axios.


🛠️ Stack Tecnológica

Backend

Node.js + Fastify: Framework leve e de alta performance para APIs.

Prisma ORM: Integração simplificada com o banco de dados MySQL.

Zod: Validação robusta de payloads de requisições.

MySQL: Banco de dados relacional para armazenamento persistente.


Frontend

Next.js: Framework React para renderização no lado do servidor e sites estáticos.

ShadCN: Componentes de UI reutilizáveis e personalizáveis.

React Query: Gerenciamento eficiente de busca e cache de dados.

React Hook Form + Zod: Formulários com validação integrada.

Axios: Requisições HTTP simplificadas.

DevOps


Docker Compose: Orquestração de serviços (backend, frontend e MySQL).

MySQL: Imagem oficial do Docker para o banco de dados.
