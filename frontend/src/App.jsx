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
import SocialPage from './pages/SocialPage';
import IntegrationsPage from './pages/IntegrationsPage';
import NotificationsPage from './pages/NotificationsPage';

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
  const [ranking, setRanking] = useState([]);
  const [clans, setClans] = useState([]);
  const [integrations, setIntegrations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [appError, setAppError] = useState('');

  async function loadData(userId) {
    const results = await Promise.allSettled([
      api.getDashboard(userId),
      api.getTasks(userId),
      api.getHistory(userId),
      api.getAchievements(userId),
      api.getAnalytics(userId),
      api.getRanking(10),
      api.getClans(),
      api.getIntegrations(userId),
      api.getNotifications(userId)
    ]);

    const getValue = (idx, fallback) => (results[idx].status === 'fulfilled' ? results[idx].value : fallback);

    setDashboard(getValue(0, null));
    setTasks(getValue(1, []));
    setHistory(getValue(2, null));
    setAchievements(getValue(3, []));
    setAnalytics(getValue(4, null));
    setRanking(getValue(5, { ranking: [] }).ranking || []);
    setClans(getValue(6, { clans: [] }).clans || []);
    setIntegrations(getValue(7, { integrations: [] }).integrations || []);
    setNotifications(getValue(8, { notifications: [] }).notifications || []);

    const failedCount = results.filter((item) => item.status === 'rejected').length;
    if (failedCount > 0) {
      setAppError(`Alguns dados não puderam ser carregados (${failedCount} falhas). Verifique se seu banco está atualizado com o schema mais recente.`);
    } else {
      setAppError('');
    }
  }

  useEffect(() => {
    if (session?.user?.id) {
      loadData(session.user.id).catch((error) => {
        setAppError(error.message || 'Erro ao carregar dados da sessão.');
      });
    }
  }, [session?.user?.id]);

  async function handleLogin(email, password) {
    const data = await api.login(email, password);
    setSession(data);
    setAppError('');
    localStorage.setItem('forja_session', JSON.stringify(data));
  }

  function handleLogout() {
    setSession(null);
    setDashboard(null);
    setTasks([]);
    setHistory(null);
    setAchievements([]);
    setAnalytics(null);
    setRanking([]);
    setClans([]);
    setIntegrations([]);
    setNotifications([]);
    setAppError('');
    localStorage.removeItem('forja_session');
  }

  async function handleCompleteTask(taskId) {
    if (!session?.user?.id) return;
    await api.completeTask(taskId);
    await loadData(session.user.id);
  }

  async function handleCreateClan(payload) {
    await api.createClan(payload);
    await loadData(session.user.id);
  }

  async function handleJoinClan(clanId, userId) {
    await api.joinClan(clanId, userId);
    await loadData(session.user.id);
  }

  async function handleConnectIntegration(payload) {
    await api.connectIntegration(payload);
    await loadData(session.user.id);
  }

  async function handleScheduleNotification(payload) {
    await api.scheduleNotification(payload);
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
    if (page === 'social') return <SocialPage ranking={ranking} clans={clans} onCreateClan={handleCreateClan} onJoinClan={handleJoinClan} userId={session.user.id} />;
    if (page === 'integrations') return <IntegrationsPage integrations={integrations} onConnect={handleConnectIntegration} userId={session.user.id} />;
    if (page === 'notifications') return <NotificationsPage notifications={notifications} onSchedule={handleScheduleNotification} userId={session.user.id} />;
    return <SettingsPage />;
  };

  return (
    <Layout
      user={session.user}
      currentPage={page}
      onNavigate={setPage}
      onLogout={handleLogout}
    >
      {appError ? <div className="card error-banner">{appError}</div> : null}
      {renderPage()}
    </Layout>
  );
}
