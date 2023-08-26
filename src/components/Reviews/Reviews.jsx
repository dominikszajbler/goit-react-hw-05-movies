import React, { useEffect, useState } from 'react';
import { getMovieReviews } from 'services/Api';

const Reviews = ({ match }) => {
  const [reviews, setReviews] = useState([]);

  const movieId = match.params.movieId;

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await getMovieReviews(movieId);
        setReviews(response.results);
      } catch (error) {
        console.log('Error fetching movie reviews:', error);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <h4>{review.author}</h4>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;