import { useState } from 'react';
import { Link } from 'react-router-dom';

const STATUTS = ['À faire', 'En cours', 'Terminé'];

export default function TaskForm({ initialData = {}, onSubmit, loading, error, success, submitLabel = 'Enregistrer' }) {
  const [form, setForm] = useState({
    titre: initialData.titre || '',
    description: initialData.description || '',
    statut: initialData.statut || 'À faire',
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.titre.trim()) errs.titre = 'Le titre est obligatoire.';
    return errs;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit(form);
  }

  return (
    <div className="form-container">
      <Link to="/" className="back-link">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Retour à la liste
      </Link>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="success-banner">
          ✓ {success}
        </div>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="titre">
              Titre <span className="required">*</span>
            </label>
            <input
              id="titre"
              name="titre"
              type="text"
              className="form-input"
              value={form.titre}
              onChange={handleChange}
              placeholder="Ex: Réviser le chapitre 3"
              autoFocus
            />
            {errors.titre && (
              <p className="form-error">⚠ {errors.titre}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnelle)</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              value={form.description}
              onChange={handleChange}
              placeholder="Ajoutez des détails sur cette tâche..."
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="statut">
              Statut
            </label>
            <select
              id="statut"
              name="statut"
              className="form-select"
              value={form.statut}
              onChange={handleChange}
            >
              {STATUTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 16, height: 16 }} />
                  En cours...
                </>
              ) : submitLabel}
            </button>
            <Link to="/" className="btn btn-ghost">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
