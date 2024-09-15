import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../service/api";
import { Grid } from "react-loader-spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        if (!movieId) {
          return;
        }
        const data = await getMovieCast(movieId);
        setMovieCast(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <Grid />}
      {error && <ErrorMessage />}
      {!loading && movieCast ? (
        <ul className={css.castList}>
          {movieCast.map((cast) => (
            <li key={cast.id} className={css.castItem}>
              {cast.profile_path ? (
                <img
                  className={css.castImg}
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  alt={cast.name}
                />
              ) : (
                <img
                  className={css.castImg}
                  src="https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
                  alt="default avatar"
                />
              )}

              <ul className={css.sublist}>
                <li>{cast.name}</li>
                <li>Character: {cast.character}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <ErrorMessage></ErrorMessage>
      )}
    </div>
  );
}
