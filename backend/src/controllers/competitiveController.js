const pool = require('../config/db');

async function getSeasons(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, status, started_at, ended_at
       FROM seasons
       ORDER BY started_at DESC`
    );
    return res.json({ seasons: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar temporadas.', error: error.message });
  }
}

async function getClanRanking(req, res) {
  try {
    const { seasonId } = req.query;

    const [rows] = await pool.query(
      `SELECT
        c.id,
        c.name,
        COALESCE(SUM(cp.points), 0) AS season_points
      FROM clans c
      LEFT JOIN clan_points cp ON cp.clan_id = c.id
      LEFT JOIN seasons s ON s.id = cp.season_id
      WHERE (? IS NULL OR cp.season_id = ?)
      GROUP BY c.id
      ORDER BY season_points DESC, c.name ASC`,
      [seasonId || null, seasonId || null]
    );

    const ranking = rows.map((item, index) => ({
      position: index + 1,
      ...item
    }));

    return res.json({ ranking });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao carregar ranking de clãs.', error: error.message });
  }
}

async function listBadges(req, res) {
  try {
    const { userId } = req.query;

    const [rows] = await pool.query(
      `SELECT
        b.id,
        b.code,
        b.title,
        b.description,
        b.rarity,
        ub.unlocked_at,
        CASE WHEN ub.id IS NULL THEN 0 ELSE 1 END AS unlocked
      FROM badges b
      LEFT JOIN user_badges ub ON ub.badge_id = b.id AND ub.user_id = ?
      ORDER BY unlocked DESC, b.rarity DESC, b.id ASC`,
      [userId]
    );

    return res.json({ badges: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar badges.', error: error.message });
  }
}

module.exports = {
  getSeasons,
  getClanRanking,
  listBadges
};
