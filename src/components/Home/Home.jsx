import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTrendingMovies } from 'services/Api';

import css from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await getTrendingMovies();
        setMovies(response.results);
      } catch (error) {
        console.log(
          'Wystąpił błąd podczas pobierania popularnych filmów:',
          error
        );
      }
    };

    fetchTrendingMovies();
  }, []);

  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  const handleMouseEnter = movieId => {
    setHoveredMovieId(movieId);
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
  };

  return (
    <div className={css.home}>
      <h1>Popularne filmy</h1>
      {movies.map(movie => (
        <div
          key={movie.id}
          onMouseEnter={() => handleMouseEnter(movie.id)}
          onMouseLeave={handleMouseLeave}
          className={css.movieItem}
        >
          <Link to={`/movies/${movie.id}`} className={css.movieLink}>
            <h3>{movie.title}</h3>
          </Link>
          {hoveredMovieId === movie.id && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className={css.moviePoster}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;