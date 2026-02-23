import React, { useState } from 'react';

const TYPES = ['daily', 'weekly', 'long'];

export default function TasksPage({ tasks, onComplete, onReload }) {
  const [type, setType] = useState('daily');
  const filtered = tasks.filter((task) => task.type === type);

  return (
    <div>
      <h1>Tarefas</h1>
      <div className="row">
        {TYPES.map((t) => (
          <button key={t} className={type === t ? 'active' : ''} onClick={() => setType(t)}>{t}</button>
        ))}
        <button onClick={onReload}>Recarregar</button>
      </div>

      <div className="grid">
        {filtered.map((task) => (
          <div className="card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p className="muted">Atributo: {task.attribute_code} • XP: {task.xp_reward}</p>
            <button onClick={() => onComplete(task.id)}>Concluir</button>
          </div>
        ))}
        {!filtered.length ? <p>Sem tarefas neste tipo.</p> : null}
      </div>
    </div>
  );
}
