import React, { useState } from 'react';

export default function NotificationsPage({ notifications, onSchedule, userId }) {
  const [title, setTitle] = useState('Lembrete Forja');
  const [body, setBody] = useState('Hora de evoluir!');

  async function submit(event) {
    event.preventDefault();
    await onSchedule({ userId, title, body, channel: 'push' });
  }

  return (
    <div>
      <h1>Notificações</h1>
      <div className="card">
        <form onSubmit={submit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <input value={body} onChange={(e) => setBody(e.target.value)} />
          <button type="submit">Agendar push</button>
        </form>
      </div>
      <div className="card">
        <h3>Fila de notificações</h3>
        <ul>
          {notifications.map((item) => (
            <li key={item.id}>{item.title} • {item.channel} • {item.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
