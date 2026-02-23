import React from 'react';

function pct(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export default function AnalyticsPage({ analytics }) {
  if (!analytics) return <p>Carregando análises...</p>;

  const maxHeat = Math.max(...analytics.heatmap.map((item) => Number(item.completed || 0)), 1);

  return (
    <div>
      <h1>Análises Inteligentes</h1>

      <div className="card">
        <h3>Insight automático</h3>
        <p>{analytics.insights.message}</p>
      </div>

      <div className="grid two">
        <div className="card">
          <h3>Heatmap de consistência (90 dias)</h3>
          <div className="heatmap-grid">
            {analytics.heatmap.map((item) => {
              const intensity = pct(Number(item.completed || 0), maxHeat);
              return (
                <div
                  key={item.day}
                  className="heat-cell"
                  style={{ opacity: Math.max(0.2, intensity / 100) }}
                  title={`${item.day}: ${item.completed} tarefas`}
                >
                  <small>{String(item.day).slice(5)}</small>
                  <strong>{item.completed}</strong>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3>Radar de atributos (visual simplificado)</h3>
          <div className="radar-list">
            {analytics.radar.map((item) => (
              <div key={item.code} className="radar-row">
                <span>{item.code}</span>
                <div className="mini-bar">
                  <div style={{ width: `${Math.min(100, Number(item.points) * 4)}%` }} />
                </div>
                <strong>{item.points}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Meta vs realizado (XP no mês atual)</h3>
        <div className="radar-list">
          {analytics.goals.map((item) => (
            <div key={item.attribute_code} className="goal-row">
              <span>{item.attribute_code}</span>
              <span>Meta: {item.target_xp || 0}</span>
              <span>Realizado: {item.achieved_xp || 0}</span>
              <span>{pct(Number(item.achieved_xp || 0), Number(item.target_xp || 0))}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
