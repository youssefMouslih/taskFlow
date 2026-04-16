import { useNavigate } from 'react-router-dom';

function getStatusClass(statut) {
  if (statut === 'En cours') return 'inprogress';
  if (statut === 'Terminé') return 'done';
  return 'todo';
}

export default function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();
  const statusClass = getStatusClass(task.statut);

  return (
    <div className={`task-card ${statusClass}`}>
      <div className="task-body">
        <h3 className="task-title">{task.titre}</h3>
        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}
        <div className="task-footer">
          <span className={`status-badge ${statusClass}`}>
            {task.statut}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          className="btn-icon edit"
          onClick={() => navigate(`/modifier/${task.id}`)}
          title="Modifier"
          aria-label="Modifier la tâche"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M10.5 1.5l3 3L4.5 13.5H1.5v-3L10.5 1.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="btn-icon delete"
          onClick={() => onDelete(task)}
          title="Supprimer"
          aria-label="Supprimer la tâche"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 3h12M5 3V1.5h4V3M2.5 3l1 9h7l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
