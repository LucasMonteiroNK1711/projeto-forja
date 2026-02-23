USE projeto_forja;

INSERT INTO users (name, email, password_hash, total_xp, streak_days)
VALUES ('Usuário Demo', 'demo@forja.app', 'demo123', 180, 4)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'strength', 12 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'strength'
);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'intelligence', 20 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'intelligence'
);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'finance', 8 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'finance'
);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'mindset', 14 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'mindset'
);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'social', 7 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'social'
);

INSERT INTO attributes (user_id, code, points)
SELECT 1, 'discipline', 10 FROM DUAL WHERE NOT EXISTS (
  SELECT 1 FROM attributes WHERE user_id = 1 AND code = 'discipline'
);

INSERT INTO tasks (user_id, title, description, type, attribute_code, xp_reward)
VALUES
  (1, 'Treinar 45 minutos', 'Treino de força', 'daily', 'strength', 20),
  (1, 'Ler 20 minutos', 'Leitura técnica', 'daily', 'intelligence', 15),
  (1, 'Revisão financeira', 'Revisar gastos da semana', 'weekly', 'finance', 30),
  (1, 'Projeto React', 'Evoluir app principal', 'long', 'discipline', 50)
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO achievements (code, title, description, xp_reward)
VALUES
  ('streak_7', '7 dias seguidos', 'Concluir tarefas por 7 dias consecutivos', 50),
  ('train_30', '30 treinos', 'Completar 30 tarefas de treino', 120),
  ('study_100h', '100 horas de estudo', 'Acumular 100h de estudo', 300)
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO clans (name, description, owner_user_id)
SELECT 'Forja Alpha', 'Clã inicial para evolução em conjunto', 1
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM clans WHERE name = 'Forja Alpha');

INSERT INTO clan_members (clan_id, user_id, role, joined_at)
SELECT c.id, 1, 'owner', NOW()
FROM clans c
WHERE c.name = 'Forja Alpha'
  AND NOT EXISTS (
    SELECT 1 FROM clan_members cm WHERE cm.clan_id = c.id AND cm.user_id = 1
  );

INSERT INTO integrations (user_id, provider, status, token_placeholder, created_at)
SELECT 1, 'notion', 'connected', 'demo-token', NOW()
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM integrations WHERE user_id = 1 AND provider = 'notion'
);

INSERT INTO notifications (user_id, title, body, channel, scheduled_for, status, created_at)
SELECT 1, 'Missão de hoje', 'Não esqueça de concluir suas tarefas diárias.', 'push', DATE_ADD(NOW(), INTERVAL 1 HOUR), 'scheduled', NOW()
FROM DUAL
WHERE NOT EXISTS (
  SELECT 1 FROM notifications WHERE user_id = 1 AND title = 'Missão de hoje'
);
