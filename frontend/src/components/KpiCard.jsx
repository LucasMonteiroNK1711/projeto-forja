import React from 'react';

export default function KpiCard({ title, value, subtitle }) {
  return (
    <div className="card kpi-card">
      <p className="muted">{title}</p>
      <h3>{value}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
