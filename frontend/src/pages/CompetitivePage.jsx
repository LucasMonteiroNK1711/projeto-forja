import React, { useState } from 'react';

export default function CompetitivePage({ seasons, clanRanking, badges, onDispatchQueue }) {
  const [dispatchMsg, setDispatchMsg] = useState('');

  async function handleDispatch() {
    const result = await onDispatchQueue();
    setDispatchMsg(result?.message || 'Fila processada.');
  }

  const activeSeason = seasons.find((item) => item.status === 'active');

  return (
    <div>
      <h1>Competitivo (Fase 5)</h1>

      <div className="grid two">
        <div className="card">
          <h3>Temporadas</h3>
          <ul>
            {seasons.map((season) => (
              <li key={season.id}>{season.name} • {season.status}</li>
            ))}
          </ul>
          <p className="muted">Ativa: {activeSeason ? activeSeason.name : 'nenhuma'}</p>
        </div>

        <div className="card">
          <h3>Worker de Notificações</h3>
          <p>Processa notificações agendadas e marca como enviadas.</p>
          <button onClick={handleDispatch}>Processar fila agora</button>
          {dispatchMsg ? <p className="muted">{dispatchMsg}</p> : null}
        </div>
      </div>

      <div className="card">
        <h3>Ranking por Clã (temporada)</h3>
        <ol>
          {clanRanking.map((item) => (
            <li key={item.id}>#{item.position} {item.name} • {item.season_points} pts</li>
          ))}
        </ol>
      </div>

      <div className="card">
        <h3>Badges Avançadas</h3>
        <div className="grid">
          {badges.map((badge) => (
            <div key={badge.id} className={`card ${badge.unlocked ? 'unlocked' : ''}`}>
              <strong>{badge.title}</strong>
              <p>{badge.description}</p>
              <small>{badge.rarity}</small>
              <p>{badge.unlocked ? 'Desbloqueada' : 'Bloqueada'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
