const pool = require('../config/db');

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const [rows] = await pool.query(
      'SELECT id, name, email, password_hash, total_xp, streak_days FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = rows[0];

    if (user.password_hash !== password) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    return res.json({
      token: `demo-token-${user.id}`,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        total_xp: user.total_xp,
        streak_days: user.streak_days
      }
    });
  } catch (error) {
    return res.status(500).json({ message: 'Erro no login.', error: error.message });
  }
}

module.exports = { login };
