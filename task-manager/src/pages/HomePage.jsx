import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import DeleteModal from '../components/DeleteModal';
import { getTasks, deleteTask } from '../services/taskService';

const FILTERS = ['Tout', 'À faire', 'En cours', 'Terminé'];

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Tout');
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch {
      setError('Impossible de charger les tâches. Assurez-vous que json-server est lancé sur le port 3001.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    try {
      setDeleteLoading(true);
      await deleteTask(taskToDelete.id);
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
    } catch {
      setError('Erreur lors de la suppression.');
    } finally {
      setDeleteLoading(false);
    }
  };

  const filtered = filter === 'Tout' ? tasks : tasks.filter((t) => t.statut === filter);

  const counts = {
    todo: tasks.filter((t) => t.statut === 'À faire').length,
    inprogress: tasks.filter((t) => t.statut === 'En cours').length,
    done: tasks.filter((t) => t.statut === 'Terminé').length,
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Mes <span>Tâches</span>
        </h1>
        <p className="page-subtitle">
          {tasks.length} tâche{tasks.length !== 1 ? 's' : ''} au total
        </p>
      </div>

      {tasks.length > 0 && (
        <div className="stats-bar">
          <div className="stat-chip todo">
            <span className="dot" />
            À faire
            <span className="count">{counts.todo}</span>
          </div>
          <div className="stat-chip inprogress">
            <span className="dot" />
            En cours
            <span className="count">{counts.inprogress}</span>
          </div>
          <div className="stat-chip done">
            <span className="dot" />
            Terminées
            <span className="count">{counts.done}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="error-banner">⚠️ {error}</div>
      )}

      {!loading && tasks.length > 0 && (
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          Chargement des tâches...
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>{filter === 'Tout' ? 'Aucune tâche pour le moment' : `Aucune tâche "${filter}"`}</h3>
          <p>
            {filter === 'Tout'
              ? 'Commencez par créer votre première tâche.'
              : 'Essayez un autre filtre ou ajoutez une nouvelle tâche.'}
          </p>
          {filter === 'Tout' && (
            <Link to="/ajouter" className="btn btn-primary">
              + Créer une tâche
            </Link>
          )}
        </div>
      ) : (
        <div className="task-list">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={setTaskToDelete}
            />
          ))}
        </div>
      )}

      {taskToDelete && (
        <DeleteModal
          task={taskToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setTaskToDelete(null)}
          loading={deleteLoading}
        />
      )}
    </>
  );
}
