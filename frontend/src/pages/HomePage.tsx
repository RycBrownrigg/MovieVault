import { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';

type MovieSummary = {
  id: string;
  title: string;
  releaseYear?: number;
  posterImageUrl?: string;
};

export const HomePage = () => {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get<{ data: MovieSummary[] }>('/movies', {
          params: { limit: 12 },
        });

        setMovies(response.data?.data ?? []);
      } catch (err) {
        console.error('Failed to load movies', err);
        setError('Unable to load movies yet. Backend API is still under construction.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="page-card">
      <header>
        <h2 className="page-card__title">Browse Collection</h2>
        <p className="page-card__subtitle">
          Discover movies in your vault. Search, filter, and drill into detailed metadata.
        </p>
      </header>

      {isLoading && <p>Loading movies&hellip;</p>}
      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && movies.length === 0 && <p>No movies available yet.</p>}

      {!isLoading && movies.length > 0 && (
        <ul className="page-card__list">
          {movies.map((movie) => (
            <li key={movie.id}>
              <strong>{movie.title}</strong>
              {movie.releaseYear && <span> &middot; {movie.releaseYear}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

