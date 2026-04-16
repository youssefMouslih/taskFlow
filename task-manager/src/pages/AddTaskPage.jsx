import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { createTask } from '../services/taskService';

export default function AddTaskPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createTask(formData);
      setSuccess('Tâche créée avec succès !');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setError('Erreur lors de la création. Vérifiez que json-server est actif.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">
          Nouvelle <span>Tâche</span>
        </h1>
        <p className="page-subtitle">Remplissez le formulaire ci-dessous</p>
      </div>

      <TaskForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
        success={success}
        submitLabel="Créer la tâche"
      />
    </>
  );
}
