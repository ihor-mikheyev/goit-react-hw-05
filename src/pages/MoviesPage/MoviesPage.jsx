import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid } from "react-loader-spinner";
import { getMoviesByQuery } from "../../service/api";
import Form from "../../components/Form/Form";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await getMoviesByQuery(query);
        setMovies((prevCollection) => [...prevCollection, ...data.results]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query]);

  const handleSubmit = (query) => {
    setMovies([]);
    setSearchParams({ query });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList list={movies} />}
      {loading && <Grid />}
    </div>
  );
}
