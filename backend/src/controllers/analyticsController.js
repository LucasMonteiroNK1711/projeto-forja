const pool = require('../config/db');

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

async function getAnalytics(req, res) {
  try {
    const { userId } = req.params;

    const [heatmapRows] = await pool.query(
      `SELECT
        DATE(tl.completed_at) AS day,
        COUNT(*) AS completed,
        SUM(tl.xp_gained) AS xp
      FROM task_logs tl
      WHERE tl.user_id = ?
        AND tl.completed_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      GROUP BY DATE(tl.completed_at)
      ORDER BY day ASC`,
      [userId]
    );

    const [radarRows] = await pool.query(
      `SELECT code, points
       FROM attributes
       WHERE user_id = ?
       ORDER BY code ASC`,
      [userId]
    );

    const [weekdayRows] = await pool.query(
      `SELECT
        DAYOFWEEK(completed_at) AS weekday,
        COUNT(*) AS completions,
        SUM(xp_gained) AS xp
       FROM task_logs
       WHERE user_id = ?
       GROUP BY DAYOFWEEK(completed_at)
       ORDER BY completions DESC`,
      [userId]
    );

    const [hourRows] = await pool.query(
      `SELECT
        HOUR(completed_at) AS hour,
        COUNT(*) AS completions
       FROM task_logs
       WHERE user_id = ?
       GROUP BY HOUR(completed_at)
       ORDER BY completions DESC
       LIMIT 3`,
      [userId]
    );

    const [goalRows] = await pool.query(
      `SELECT
        t.attribute_code,
        SUM(t.xp_reward) AS target_xp,
        SUM(CASE WHEN MONTH(tl.completed_at) = MONTH(CURDATE()) AND YEAR(tl.completed_at) = YEAR(CURDATE()) THEN tl.xp_gained ELSE 0 END) AS achieved_xp
      FROM tasks t
      LEFT JOIN task_logs tl ON tl.task_id = t.id AND tl.user_id = t.user_id
      WHERE t.user_id = ?
      GROUP BY t.attribute_code
      ORDER BY t.attribute_code ASC`,
      [userId]
    );

    const topWeekday = weekdayRows[0]
      ? WEEKDAYS[(Number(weekdayRows[0].weekday) + 5) % 7]
      : null;

    const topHours = hourRows.map((row) => `${String(row.hour).padStart(2, '0')}:00`);

    return res.json({
      heatmap: heatmapRows,
      radar: radarRows,
      goals: goalRows,
      insights: {
        topWeekday,
        topHours,
        message: topWeekday
          ? `Seu melhor dia de performance é ${topWeekday}. Horários fortes: ${topHours.join(', ') || 'sem dados suficientes'}.`
          : 'Ainda não há dados suficientes para gerar insights.'
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao carregar análises.', error: error.message });
  }
}

module.exports = { getAnalytics };
