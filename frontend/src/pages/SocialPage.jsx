import React, { useState } from 'react';

export default function SocialPage({ ranking, clans, onCreateClan, onJoinClan, userId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (!name) return;
    await onCreateClan({ name, description, ownerUserId: userId });
    setName('');
    setDescription('');
  }

  return (
    <div>
      <h1>Social (Ranking + Clãs)</h1>
      <div className="grid two">
        <div className="card">
          <h3>Ranking Global</h3>
          <ol>
            {ranking.map((item) => (
              <li key={item.id}>#{item.position} {item.name} — {item.total_xp} XP</li>
            ))}
          </ol>
        </div>
        <div className="card">
          <h3>Criar Clã</h3>
          <form onSubmit={submit}>
            <input placeholder="Nome do clã" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Criar</button>
          </form>
          <h3>Clãs</h3>
          {clans.map((clan) => (
            <div key={clan.id} className="card clan-card">
              <strong>{clan.name}</strong>
              <p>{clan.description}</p>
              <small>{clan.members} membros • {clan.total_xp} XP</small>
              <button onClick={() => onJoinClan(clan.id, userId)}>Entrar</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
