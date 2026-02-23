const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro na requisição');
  }

  return data;
}

export const api = {
  login: (email, password) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }),
  getDashboard: (userId) => request(`/dashboard/${userId}`),
  getTasks: (userId, type) => request(`/tasks?userId=${userId}${type ? `&type=${type}` : ''}`),
  completeTask: (taskId) => request(`/tasks/${taskId}/complete`, { method: 'POST' }),
  getHistory: (userId) => request(`/history/${userId}`),
  getAchievements: (userId) => request(`/achievements?userId=${userId}`)
};
