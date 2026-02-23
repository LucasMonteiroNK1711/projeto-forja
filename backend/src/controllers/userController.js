const pool = require('../config/db');
const { resolveLevelProgress } = require('../services/xpService');

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT id, name, email, total_xp, streak_days FROM users WHERE id = ?', [id]);

    if (!rows.length) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = rows[0];
    const levelData = resolveLevelProgress(user.total_xp);

    return res.json({
      ...user,
      level: levelData.level,
      xpInCurrentLevel: levelData.xpInCurrentLevel,
      xpToNextLevel: levelData.xpToNextLevel,
      progressPercent: levelData.progressPercent
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar usuário.', error: error.message });
  }
}

module.exports = { getUserById };
