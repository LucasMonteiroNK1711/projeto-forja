import React, { useEffect, useState } from 'react';
import { api } from './services/api';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import HistoryPage from './pages/HistoryPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem('forja_session');
    return raw ? JSON.parse(raw) : null;
  });
  const [page, setPage] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [history, setHistory] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  async function loadData(userId) {
    const [dashboardData, taskData, historyData, achievementData, analyticsData] = await Promise.all([
      api.getDashboard(userId),
      api.getTasks(userId),
      api.getHistory(userId),
      api.getAchievements(userId),
      api.getAnalytics(userId)
    ]);
    setDashboard(dashboardData);
    setTasks(taskData);
    setHistory(historyData);
    setAchievements(achievementData);
    setAnalytics(analyticsData);
  }

  useEffect(() => {
    if (session?.user?.id) {
      loadData(session.user.id).catch(() => {
        setSession(null);
      });
    }
  }, [session?.user?.id]);

  async function handleLogin(email, password) {
    const data = await api.login(email, password);
    setSession(data);
    localStorage.setItem('forja_session', JSON.stringify(data));
  }

  function handleLogout() {
    setSession(null);
    setDashboard(null);
    setTasks([]);
    setHistory(null);
    setAchievements([]);
    setAnalytics(null);
    localStorage.removeItem('forja_session');
  }

  async function handleCompleteTask(taskId) {
    if (!session?.user?.id) return;
    await api.completeTask(taskId);
    await loadData(session.user.id);
  }

  if (!session) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (page === 'dashboard') return <DashboardPage dashboard={dashboard} />;
    if (page === 'tasks') return <TasksPage tasks={tasks} onComplete={handleCompleteTask} onReload={() => loadData(session.user.id)} />;
    if (page === 'history') return <HistoryPage history={history} />;
    if (page === 'achievements') return <AchievementsPage achievements={achievements} />;
    if (page === 'analytics') return <AnalyticsPage analytics={analytics} />;
    return <SettingsPage />;
  };

  return (
    <Layout
      user={session.user}
      currentPage={page}
      onNavigate={setPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}
