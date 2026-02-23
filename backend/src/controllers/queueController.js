const pool = require('../config/db');

async function dispatchNotifications(req, res) {
  try {
    const { limit = 20 } = req.body;

    const [rows] = await pool.query(
      `SELECT id
       FROM notifications
       WHERE status = 'scheduled'
         AND (scheduled_for IS NULL OR scheduled_for <= NOW())
       ORDER BY created_at ASC
       LIMIT ?`,
      [Number(limit)]
    );

    if (!rows.length) {
      return res.json({ message: 'Nenhuma notificação pendente para envio.', processed: 0 });
    }

    const ids = rows.map((item) => item.id);
    await pool.query(
      `UPDATE notifications
       SET status = 'sent', sent_at = NOW()
       WHERE id IN (${ids.map(() => '?').join(',')})`,
      ids
    );

    return res.json({ message: 'Notificações processadas.', processed: ids.length, notificationIds: ids });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao processar fila de notificações.', error: error.message });
  }
}

module.exports = {
  dispatchNotifications
};
