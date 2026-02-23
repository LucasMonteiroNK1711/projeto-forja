const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const historyRoutes = require('./routes/historyRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const socialRoutes = require('./routes/socialRoutes');
const integrationRoutes = require('./routes/integrationRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const competitiveRoutes = require('./routes/competitiveRoutes');
const queueRoutes = require('./routes/queueRoutes');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean);
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origem não permitida por CORS.'));
  }
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'projeto-forja-backend' });
});

app.get('/ready', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    return res.json({ status: 'ready' });
  } catch (error) {
    return res.status(500).json({ status: 'not_ready', error: error.message });
  }
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/achievements', achievementRoutes);
app.use('/history', historyRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/social', socialRoutes);
app.use('/integrations', integrationRoutes);
app.use('/notifications', notificationRoutes);
app.use('/competitive', competitiveRoutes);
app.use('/queue', queueRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${port}`);
});
