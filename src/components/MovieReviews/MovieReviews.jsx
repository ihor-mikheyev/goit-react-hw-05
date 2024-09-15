import { useState, useEffect } from "react";
import { getMovieReviews } from "../../service/api";
import { useParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (movieReviews.length > 0) {
      return;
    }
    async function wrapper() {
      try {
        setLoading(true);
        setError(false);
        const response = await getMovieReviews(movieId);
        setMovieReviews(response);
        console.log(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    wrapper();
  }, [movieId, movieReviews]);

  return (
    <div>
      {loading && <Grid />}
      {error && <ErrorMessage />}

      <ul className={css.reviewsList}>
        {movieReviews.length > 0 ? (
          movieReviews.map((review) => (
            <li key={review.id}>
              <div className={css.reviewItem}>
                <h4>{review.author}</h4>
                <p>{review.content}</p>
              </div>
            </li>
          ))
        ) : (
          <p>We do not have any reviews for this movie</p>
        )}
      </ul>
    </div>
  );
}
