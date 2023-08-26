import React, { useState } from 'react';
import { searchMovies } from 'services/Api';
import { Link } from 'react-router-dom';

import css from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();

    try {
      const response = await searchMovies(searchQuery);
      setSearchResults(response.results);
      setNoResults(response.results.length === 0);
    } catch (error) {
      console.log('Error searching movies:', error);
    }
  };

  return (
    <div className={css.moviesContainer}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={css.searchForm}>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Enter a movie title"
          className={css.searchInput}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      {noResults && <p className={css.noResults}>No results found</p>}
      {searchResults.map(movie => (
        <div key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`} className={css.movieLink}>
            <h3>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Movies;