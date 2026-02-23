const pool = require('../config/db');
const { resolveLevelProgress } = require('../services/xpService');
const { calculateDisciplineIndex, calculateProductivityScore } = require('../services/metricsService');

async function getDashboard(req, res) {
  try {
    const { userId } = req.params;

    const [[user]] = await pool.query('SELECT id, name, total_xp, streak_days FROM users WHERE id = ?', [userId]);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const [[dailyStats]] = await pool.query(
      `SELECT
        COUNT(*) AS planned,
        SUM(CASE WHEN DATE(tl.completed_at) = CURDATE() THEN 1 ELSE 0 END) AS completed
      FROM tasks t
      LEFT JOIN task_logs tl ON tl.task_id = t.id
      WHERE t.user_id = ? AND t.type = 'daily'`,
      [userId]
    );

    const [[weeklyStats]] = await pool.query(
      `SELECT COUNT(*) AS completed
       FROM task_logs
       WHERE user_id = ?
         AND YEARWEEK(completed_at, 1) = YEARWEEK(CURDATE(), 1)`,
      [userId]
    );

    const [xpByDay] = await pool.query(
      `SELECT DATE(created_at) AS day, SUM(xp_amount) AS xp
       FROM xp_history
       WHERE user_id = ?
       GROUP BY DATE(created_at)
       ORDER BY day DESC
       LIMIT 14`,
      [userId]
    );

    const levelData = resolveLevelProgress(user.total_xp);
    const disciplineIndex = calculateDisciplineIndex(Number(dailyStats.completed || 0), Number(dailyStats.planned || 0));
    const productivityScore = calculateProductivityScore({
      dailyCompleted: Number(dailyStats.completed || 0),
      weeklyCompleted: Number(weeklyStats.completed || 0),
      streakDays: Number(user.streak_days || 0)
    });

    return res.json({
      user,
      levelData,
      kpis: {
        disciplineIndex,
        productivityScore,
        dailyCompleted: Number(dailyStats.completed || 0),
        dailyPlanned: Number(dailyStats.planned || 0),
        weeklyCompleted: Number(weeklyStats.completed || 0),
        streakDays: Number(user.streak_days || 0)
      },
      charts: {
        xpByDay
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao montar dashboard.', error: error.message });
  }
}

module.exports = { getDashboard };
