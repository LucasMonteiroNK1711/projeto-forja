const pool = require('../config/db');

async function getHistory(req, res) {
  try {
    const { userId } = req.params;

    const [xpHistory] = await pool.query(
      `SELECT id, source_type, source_id, xp_amount, created_at
       FROM xp_history
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    const [taskCompletions] = await pool.query(
      `SELECT tl.id, t.title, t.type, tl.xp_gained, tl.completed_at
       FROM task_logs tl
       INNER JOIN tasks t ON t.id = tl.task_id
       WHERE tl.user_id = ?
       ORDER BY tl.completed_at DESC
       LIMIT 50`,
      [userId]
    );

    return res.json({ xpHistory, taskCompletions });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar histórico.', error: error.message });
  }
}

module.exports = { getHistory };
