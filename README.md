# Projeto Forja — Starter de Aplicação de Gamificação da Vida

Este repositório traz uma **base inicial backend + modelagem de dados + regras de gamificação** para você evoluir uma aplicação estilo "Projeto Forja".

## Stack

- **Backend:** Node.js + Express
- **Banco:** MySQL 8+
- **Arquitetura:** REST API + camadas (`routes`, `controllers`, `services`)

## Funcionalidades contempladas nesta base

- Sistema de níveis e XP (progressão não linear)
- Atributos da vida (força, inteligência, finanças, mentalidade, social, disciplina)
- Tarefas diárias, semanais e de longo prazo
- Registro de conclusão de tarefas (logs)
- Histórico de XP
- Estrutura para conquistas
- Endpoints de dashboard com métricas principais

## Fórmula de XP por nível

```txt
XP necessário = 100 * (nível ^ 1.5)
```

## Estrutura do projeto

```txt
.
├── backend/
│   ├── package.json
│   └── src/
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   ├── dashboardController.js
│       │   ├── taskController.js
│       │   └── userController.js
│       ├── routes/
│       │   ├── dashboardRoutes.js
│       │   ├── taskRoutes.js
│       │   └── userRoutes.js
│       ├── services/
│       │   ├── metricsService.js
│       │   └── xpService.js
│       └── server.js
├── database/
│   ├── schema.sql
│   └── seed.sql
└── docs/
    └── roadmap.md
```

## Como rodar

1. Instale dependências:

```bash
cd backend
npm install
```

2. Configure variáveis de ambiente (`.env`):

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha
DB_NAME=projeto_forja
```

3. Crie banco e tabelas:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

4. Execute:

```bash
npm run dev
```

## Próximos passos sugeridos

- Adicionar autenticação (JWT)
- Implementar frontend React (Dashboard + Tarefas + Conquistas)
- Criar gráficos (linha, barra, radar, heatmap)
- Implementar engine de conquistas automática
- Notificações e rotina de reset diário de tarefas
