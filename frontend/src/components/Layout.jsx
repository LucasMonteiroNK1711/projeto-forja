import React from 'react';

const MENU = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'tasks', label: 'Tarefas' },
  { key: 'history', label: 'Histórico' },
  { key: 'achievements', label: 'Conquistas' },
  { key: 'settings', label: 'Configurações' }
];

export default function Layout({ user, currentPage, onNavigate, onLogout, children }) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h2>🔥 Projeto Forja</h2>
        <p className="muted">{user?.name}</p>
        <nav>
          {MENU.map((item) => (
            <button
              key={item.key}
              className={currentPage === item.key ? 'active' : ''}
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button className="logout" onClick={onLogout}>Sair</button>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
