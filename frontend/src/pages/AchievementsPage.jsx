import React from 'react';

export default function AchievementsPage({ achievements }) {
  return (
    <div>
      <h1>Conquistas</h1>
      <div className="grid">
        {achievements.map((item) => (
          <div key={item.id} className={`card ${item.unlocked ? 'unlocked' : ''}`}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p className="muted">Recompensa: +{item.xp_reward} XP</p>
            <p>{item.unlocked ? `Desbloqueada em ${new Date(item.unlocked_at).toLocaleDateString()}` : 'Bloqueada'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
