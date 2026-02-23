const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'projeto-forja-backend' });
});

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${port}`);
});
