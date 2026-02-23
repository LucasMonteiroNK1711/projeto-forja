# Projeto Forja — App de Gamificação da Vida

Base completa em evolução para um sistema tipo RPG da vida com dashboard e acompanhamento de hábitos.

## Stack

- Backend: Node.js + Express + MySQL
- Frontend: React + Vite

## Status atual

### Fase 1 (concluída)

- Modelagem MySQL (usuários, atributos, tarefas, logs, XP, conquistas)
- API base de usuários, tarefas e dashboard
- Regras de XP/nível e métricas iniciais

### Fase 2 (concluída)

- Login (sessão local no frontend)
- Dashboard com KPIs + barra de progresso + gráfico simplificado de XP
- Página de tarefas (diária/semanal/longa) com ação de conclusão
- Página de histórico (XP + conclusões)
- Página de conquistas
- Página de configurações (placeholder funcional)

### Fase 3 (concluída)

- Heatmap de consistência (últimos 90 dias)
- Radar simplificado de atributos
- Insight automático de melhor dia/horário
- Meta vs realizado por área da vida

### Fase 4 (concluída nesta entrega)

- Ranking global de usuários
- Clãs (listar, criar e entrar)
- Integrações (Notion e Google Calendar)
- Notificações push (agendamento inicial)

## Estrutura

```txt
.
├── backend/
│   ├── package.json
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── routes/
│       ├── services/
│       └── server.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── database/
│   ├── schema.sql
│   └── seed.sql
└── docs/
    └── roadmap.md
```

## Execução local

### 1) Banco

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2) Backend

```bash
cd backend
npm install
npm run dev
```

API em `http://localhost:3000`.

### 3) Frontend

```bash
cd frontend
npm install
npm run dev
```

App em `http://localhost:5173`.

## Usuário demo

- Email: `demo@forja.app`
- Senha: `demo123`

## Endpoints principais

- `POST /auth/login`
- `GET /dashboard/:userId`
- `GET /tasks?userId=1&type=daily`
- `POST /tasks/:id/complete`
- `GET /history/:userId`
- `GET /achievements?userId=1`
- `GET /analytics/:userId`
- `GET /social/ranking?limit=10`
- `GET /social/clans`
- `POST /social/clans`
- `POST /social/clans/:clanId/join`
- `GET /integrations?userId=1`
- `POST /integrations/connect`
- `GET /notifications?userId=1`
- `POST /notifications/schedule`

## Próxima etapa (Fase 5 sugerida)

- Motor competitivo com temporadas
- Engine de badges avançadas
- Ranking por clã e eventos
- Entrega real de push (worker/queue)
