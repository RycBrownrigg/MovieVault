import type { FormEvent } from 'react';
import { useState } from 'react';

type FormState = {
  title: string;
  releaseYear: string;
  runtimeMinutes: string;
};

const initialState: FormState = {
  title: '',
  releaseYear: '',
  runtimeMinutes: '',
};

export const AddMoviePage = () => {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('Submitting movie&hellip;');

    // Placeholder implementation. This should POST to `/movies` when the backend is ready.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setMessage('Movie submission is not yet wired to the backend.');
    setIsSubmitting(false);
  };

  return (
    <section className="page-card">
      <header>
        <h2 className="page-card__title">Add Movie</h2>
        <p className="page-card__subtitle">
          Capture metadata, genres, cast, and imagery to expand the MovieVault catalogue.
        </p>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <label className="form__label">
          Title
          <input
            type="text"
            name="title"
            required
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            className="form__input"
            placeholder="Inception"
          />
        </label>

        <label className="form__label">
          Release Year
          <input
            type="number"
            min="1880"
            max="2100"
            name="releaseYear"
            value={form.releaseYear}
            onChange={(event) => setForm((prev) => ({ ...prev, releaseYear: event.target.value }))}
            className="form__input"
            placeholder="2010"
          />
        </label>

        <label className="form__label">
          Runtime (minutes)
          <input
            type="number"
            min="0"
            name="runtimeMinutes"
            value={form.runtimeMinutes}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, runtimeMinutes: event.target.value }))
            }
            className="form__input"
            placeholder="148"
          />
        </label>

        <button type="submit" className="form__button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting…' : 'Save Movie'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </section>
  );
};

