# Deploy gratuito (recomendado)

Este guia usa serviços com plano free:

- **Frontend:** Vercel (grátis)
- **Backend:** Render Web Service (grátis)
- **Banco:** TiDB Cloud Serverless (MySQL compatible, grátis)

---

## 1) Banco grátis (TiDB Cloud)

1. Crie conta: https://tidbcloud.com
2. Crie um cluster **Serverless**.
3. Crie database `projeto_forja`.
4. Pegue as credenciais (host, porta 4000, user, password).
5. Rode schema e seed localmente apontando para o TiDB:

```bash
mysql --ssl-mode=REQUIRED -h <DB_HOST> -P 4000 -u <DB_USER> -p < database/schema.sql
mysql --ssl-mode=REQUIRED -h <DB_HOST> -P 4000 -u <DB_USER> -p < database/seed.sql
```

> Se o client `mysql` local não suportar SSL facilmente, use o SQL Editor do TiDB Cloud e execute os scripts manualmente.

---

## 2) Backend grátis (Render)

O repositório já contém `render.yaml` para provisionar o serviço.

1. No Render, clique em **New + > Blueprint** e conecte este repo.
2. Ao criar o serviço `projeto-forja-backend`, preencha as env vars:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME=projeto_forja`
   - `DB_PORT=4000`
   - `CORS_ORIGINS=https://SEU_FRONTEND.vercel.app`
3. Deploy.
4. Valide:
   - `https://SEU_BACKEND.onrender.com/health`
   - `https://SEU_BACKEND.onrender.com/ready`

---

## 3) Frontend grátis (Vercel)

1. No Vercel, **New Project** apontando para este repo.
2. Root directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Defina env:

```env
VITE_API_URL=https://SEU_BACKEND.onrender.com
```

6. Deploy.

---

## 4) Checklist final

- Login funciona em produção.
- Backend `/ready` retorna `ready`.
- `CORS_ORIGINS` contém a URL exata do frontend Vercel.
- Banco com `schema.sql` + `seed.sql` aplicados.

---

## Limitações do plano free

- Render free pode hibernar (cold start).
- Latência inicial pode ser alta após inatividade.
- Recursos de CPU/RAM limitados.
