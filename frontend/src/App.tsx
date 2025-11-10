import { Route, Routes } from 'react-router-dom';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AddMoviePage } from './pages/AddMoviePage';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { AppLayout } from './components/AppLayout';

const App = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies/:id" element={<MovieDetailPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/add-movie" element={<AddMoviePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  </AppLayout>
);

export default App;

