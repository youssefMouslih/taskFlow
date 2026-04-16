import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTasks, updateTask } from '../services/taskService';

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const tasks = await getTasks();
        const found = tasks.find((t) => String(t.id) === String(id));
        if (!found) {
          setError('Tâche introuvable.');
        } else {
          setTask(found);
        }
      } catch {
        setError('Impossible de charger la tâche.');
      } finally {
        setFetchLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await updateTask(id, formData);
      setSuccess('Tâche mise à jour avec succès !');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setError('Erreur lors de la mise à jour. Vérifiez que json-server est actif.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading">
        <div className="spinner" />
        Chargement...
      </div>
    );
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Modifier la <span>Tâche</span>
        </h1>
        <p className="page-subtitle">Modifiez les informations ci-dessous</p>
      </div>

      {task && (
        <TaskForm
          initialData={task}
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          success={success}
          submitLabel="Enregistrer les modifications"
        />
      )}

      {!task && error && (
        <div className="error-banner">⚠️ {error}</div>
      )}
    </>
  );
}
