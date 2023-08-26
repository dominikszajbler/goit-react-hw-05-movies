import { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import css from './App.module.css';

const Home = lazy(() => import('../Home/Home'));
const Movies = lazy(() => import('../Movies/Movies'));
const MovieDetails = lazy(() => import('../MovieDetails/MovieDetails'));
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export const App = () => {
  
  return (
    <>
      <nav className={css.navbar}>
        <Link to="/" className={css.navbar__link}>
          Home
        </Link>
        <Link to="/movies" className={css.navbar__link}>
          Movies
        </Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} />
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
};
