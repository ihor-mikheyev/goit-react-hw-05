import { useEffect, useState } from "react";
import { getMovies } from "../../service/api";
import { Grid } from "react-loader-spinner";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function wrapper() {
      try {
        setLoading(true);
        setError(null);
        const response = await getMovies();
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    wrapper();
  }, []);

  return (
    <div>
      <h2>Popular today</h2>
      {loading && <Grid />}
      {movies && <MovieList list={movies} />}
    </div>
  );
}
