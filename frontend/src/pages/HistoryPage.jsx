import React from 'react';

export default function HistoryPage({ history }) {
  if (!history) return <p>Carregando histórico...</p>;

  return (
    <div>
      <h1>Histórico</h1>
      <div className="grid two">
        <div className="card">
          <h3>XP History</h3>
          <ul>
            {history.xpHistory.map((item) => (
              <li key={item.id}>+{item.xp_amount} XP • {item.source_type} • {new Date(item.created_at).toLocaleString()}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Conclusões de Tarefa</h3>
          <ul>
            {history.taskCompletions.map((item) => (
              <li key={item.id}>{item.title} ({item.type}) • +{item.xp_gained} XP</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
