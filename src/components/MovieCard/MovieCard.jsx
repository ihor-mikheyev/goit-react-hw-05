import { Link, useLocation} from "react-router-dom";

import css from "./MovieCard.module.css";

export default function MovieCard({ movie: { id, title, poster_path, release_date } }) { 
      const location = useLocation();

  const getYear = () => {
    const year = new Date(release_date).getFullYear();
    return release_date ? year : "=^_^=";
  };
    return (
        <div className={ css.container}>
        <Link to={`/movies/${id}`} state={location}>
          {poster_path ? (
            <img
              className={css.poster}
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
            />
          ) : (
            <img
              className={css.poster}
              src="https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
              alt="no poster"
            />
          )}
          <h2 className={css.subtitle}>{`${title} (${getYear()})`}</h2>
        </Link>
    </div>
  );
}