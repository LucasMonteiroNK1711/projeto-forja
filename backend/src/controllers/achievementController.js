const pool = require('../config/db');

async function listAchievements(req, res) {
  try {
    const { userId } = req.query;

    const [rows] = await pool.query(
      `SELECT
        a.id,
        a.code,
        a.title,
        a.description,
        a.xp_reward,
        ua.unlocked_at,
        CASE WHEN ua.id IS NULL THEN 0 ELSE 1 END AS unlocked
      FROM achievements a
      LEFT JOIN user_achievements ua
        ON ua.achievement_id = a.id
       AND ua.user_id = ?
      ORDER BY unlocked DESC, a.id ASC`,
      [userId]
    );

    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar conquistas.', error: error.message });
  }
}

module.exports = { listAchievements };
