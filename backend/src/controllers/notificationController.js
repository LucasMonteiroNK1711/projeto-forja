const pool = require('../config/db');

async function listNotifications(req, res) {
  try {
    const { userId } = req.query;

    const [rows] = await pool.query(
      `SELECT id, title, body, channel, scheduled_for, sent_at, status
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 30`,
      [userId]
    );

    return res.json({ notifications: rows });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar notificações.', error: error.message });
  }
}

async function scheduleNotification(req, res) {
  try {
    const { userId, title, body, channel = 'push', scheduledFor } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: 'userId e title são obrigatórios.' });
    }

    const [result] = await pool.query(
      `INSERT INTO notifications (user_id, title, body, channel, scheduled_for, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'scheduled', NOW())`,
      [userId, title, body || null, channel, scheduledFor || null]
    );

    return res.status(201).json({ message: 'Notificação agendada.', notificationId: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao agendar notificação.', error: error.message });
  }
}

module.exports = {
  listNotifications,
  scheduleNotification
};
