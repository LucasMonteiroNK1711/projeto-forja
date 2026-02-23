const pool = require('../config/db');

async function listIntegrations(req, res) {
  try {
    const { userId } = req.query;
    const [rows] = await pool.query(
      `SELECT id, provider, status, last_sync_at, created_at
       FROM integrations
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.json({ integrations: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar integrações.', error: error.message });
  }
}

async function connectIntegration(req, res) {
  try {
    const { userId, provider } = req.body;

    if (!userId || !provider) {
      return res.status(400).json({ message: 'userId e provider são obrigatórios.' });
    }

    const [result] = await pool.query(
      `INSERT INTO integrations (user_id, provider, status, token_placeholder, created_at)
       VALUES (?, ?, 'connected', 'demo-token', NOW())`,
      [userId, provider]
    );

    return res.status(201).json({ message: 'Integração conectada.', integrationId: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao conectar integração.', error: error.message });
  }
}

module.exports = {
  listIntegrations,
  connectIntegration
};
