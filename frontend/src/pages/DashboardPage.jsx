import React from 'react';
import KpiCard from '../components/KpiCard';

export default function DashboardPage({ dashboard }) {
  if (!dashboard) return <p>Carregando dashboard...</p>;

  const { user, levelData, kpis, charts } = dashboard;

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="card">
        <h3>{user.name} • Nível {levelData.level}</h3>
        <p>XP: {levelData.xpInCurrentLevel} / {levelData.xpToNextLevel}</p>
        <div className="progress"><div style={{ width: `${levelData.progressPercent}%` }} /></div>
      </div>

      <div className="grid kpi-grid">
        <KpiCard title="Disciplina" value={`${kpis.disciplineIndex}%`} subtitle="Checklist diário" />
        <KpiCard title="Score de Produtividade" value={kpis.productivityScore} subtitle="Indicador composto" />
        <KpiCard title="Streak" value={`${kpis.streakDays} dias`} />
        <KpiCard title="Tarefas da semana" value={kpis.weeklyCompleted} />
      </div>

      <div className="card">
        <h3>XP nos últimos dias</h3>
        <div className="bars">
          {(charts.xpByDay || []).slice().reverse().map((item) => (
            <div className="bar-item" key={item.day}>
              <span>{String(item.day).slice(5)}</span>
              <div className="mini-bar"><div style={{ width: `${Math.min(100, item.xp)}%` }} /></div>
              <strong>{item.xp}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
