import React from 'react';

export default function IntegrationsPage({ integrations, onConnect, userId }) {
  return (
    <div>
      <h1>Integrações</h1>
      <div className="card">
        <p>Conecte provedores para sincronizar hábitos e agenda.</p>
        <div className="row">
          <button onClick={() => onConnect({ userId, provider: 'notion' })}>Conectar Notion</button>
          <button onClick={() => onConnect({ userId, provider: 'google_calendar' })}>Conectar Google Calendar</button>
        </div>
      </div>
      <div className="card">
        <h3>Conexões ativas</h3>
        <ul>
          {integrations.map((item) => (
            <li key={item.id}>{item.provider} • {item.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
