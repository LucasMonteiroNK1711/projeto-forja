# Deploy público (Docker)

Este projeto agora está preparado para deploy público com **Docker Compose**:

- Frontend React servido por Nginx
- Proxy `/api` do frontend para backend
- Backend Node.js (Express)
- MySQL 8 com schema/seed inicial

## 1) Pré-requisitos

- Docker + Docker Compose
- Porta `80` e `3306` liberadas no host

## 2) Subir stack

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## 3) Acessar

- App público: `http://SEU_IP_PUBLICO`
- Health backend: `http://SEU_IP_PUBLICO/api/health`
- Ready backend: `http://SEU_IP_PUBLICO/api/ready`

## 4) Configuração de domínio (opcional)

- Aponte o domínio para o IP público do servidor.
- Coloque um proxy reverso com TLS (Nginx/Caddy/Cloudflare) na frente, se desejar HTTPS.

## 5) Variáveis importantes

No serviço `backend` do compose:

- `CORS_ORIGINS`: lista separada por vírgulas de origens permitidas.
- `DB_*`: conexão MySQL.

## Observações de produção

- Troque senha root do MySQL.
- Use usuário dedicado de banco (evite root).
- Ative backup do volume `mysql_data`.
- Considere migrar MySQL para serviço gerenciado.
