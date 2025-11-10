import { useParams } from 'react-router-dom';

export const MovieDetailPage = () => {
  const { id } = useParams();

  return (
    <section className="page-card">
      <header>
        <h2 className="page-card__title">Movie Detail</h2>
        <p className="page-card__subtitle">
          Detailed metadata, relationships, and imagery for the selected movie.
        </p>
      </header>

      <p>
        This is a placeholder view. Once the backend endpoints are ready, this page will fetch data
        for movie ID <code>{id}</code> and render genres, cast, ownership, and image galleries.
      </p>
    </section>
  );
};

