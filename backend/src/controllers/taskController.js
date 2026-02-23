const pool = require('../config/db');

async function listTasks(req, res) {
  try {
    const { userId, type } = req.query;
    let query = 'SELECT * FROM tasks WHERE user_id = ?';
    const params = [userId];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar tarefas.', error: error.message });
  }
}

async function completeTask(req, res) {
  try {
    const { id } = req.params;
    const [tasks] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);

    if (!tasks.length) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }

    const task = tasks[0];

    await pool.query(
      `INSERT INTO task_logs (task_id, user_id, xp_gained, completed_at)
       VALUES (?, ?, ?, NOW())`,
      [task.id, task.user_id, task.xp_reward]
    );

    await pool.query('UPDATE users SET total_xp = total_xp + ? WHERE id = ?', [task.xp_reward, task.user_id]);

    await pool.query(
      `INSERT INTO xp_history (user_id, source_type, source_id, xp_amount, created_at)
       VALUES (?, 'task', ?, ?, NOW())`,
      [task.user_id, task.id, task.xp_reward]
    );

    return res.json({ message: 'Tarefa concluída com sucesso.', xpGained: task.xp_reward });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao concluir tarefa.', error: error.message });
  }
}

module.exports = {
  listTasks,
  completeTask
};
