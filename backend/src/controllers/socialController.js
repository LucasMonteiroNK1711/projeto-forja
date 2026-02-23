const pool = require('../config/db');

async function getRanking(req, res) {
  try {
    const { limit = 10 } = req.query;
    const [rows] = await pool.query(
      `SELECT id, name, total_xp, streak_days
       FROM users
       ORDER BY total_xp DESC, streak_days DESC
       LIMIT ?`,
      [Number(limit)]
    );

    const ranking = rows.map((row, idx) => ({
      position: idx + 1,
      ...row
    }));

    return res.json({ ranking });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao carregar ranking.', error: error.message });
  }
}

async function listClans(_req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.description, c.created_at,
              COUNT(cm.id) AS members,
              COALESCE(SUM(u.total_xp), 0) AS total_xp
       FROM clans c
       LEFT JOIN clan_members cm ON cm.clan_id = c.id
       LEFT JOIN users u ON u.id = cm.user_id
       GROUP BY c.id
       ORDER BY total_xp DESC, members DESC`
    );

    return res.json({ clans: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar clãs.', error: error.message });
  }
}

async function createClan(req, res) {
  try {
    const { name, description, ownerUserId } = req.body;
    if (!name || !ownerUserId) {
      return res.status(400).json({ message: 'name e ownerUserId são obrigatórios.' });
    }

    const [result] = await pool.query(
      `INSERT INTO clans (name, description, owner_user_id, created_at)
       VALUES (?, ?, ?, NOW())`,
      [name, description || null, ownerUserId]
    );

    await pool.query(
      `INSERT INTO clan_members (clan_id, user_id, role, joined_at)
       VALUES (?, ?, 'owner', NOW())`,
      [result.insertId, ownerUserId]
    );

    return res.status(201).json({ message: 'Clã criado com sucesso.', clanId: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao criar clã.', error: error.message });
  }
}

async function joinClan(req, res) {
  try {
    const { clanId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId é obrigatório.' });
    }

    await pool.query(
      `INSERT INTO clan_members (clan_id, user_id, role, joined_at)
       VALUES (?, ?, 'member', NOW())`,
      [clanId, userId]
    );

    return res.json({ message: 'Usuário adicionado ao clã.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao entrar no clã.', error: error.message });
  }
}

module.exports = {
  getRanking,
  listClans,
  createClan,
  joinClan
};
