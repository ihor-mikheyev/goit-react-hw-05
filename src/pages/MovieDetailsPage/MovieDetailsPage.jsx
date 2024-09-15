import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../../service/api";
import { Grid } from "react-loader-spinner";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const [movieDetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const url = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function wrapper() {
      try {
        setLoading(true);
        setError(null);
        const response = await getMovieById(movieId);
        setMovieDetails(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    wrapper();
  }, [movieId]);

  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.container}>
      <div>
        <Link to={url.current}>←Back</Link>
        {loading && <Grid />}
        {error && <ErrorMessage />}
        {movieDetails && <MovieInfo movie={movieDetails} />}

        {!loading && movieDetails && (
          <div>
            <hr />
            <p className={css.additional}>Additional information:</p>
            <ul className={css.outletList}>
              <li>
                <NavLink to="credits" className={getActiveClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={getActiveClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <hr />
          </div>
        )}
      </div>

      <Suspense fallback={<Grid />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
