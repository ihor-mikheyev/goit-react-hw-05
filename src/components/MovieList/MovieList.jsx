import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

import css from "./MovieList.module.css";

export default function MovieList({ list }) {
  return (
    <ul className={css.movieList}>
      {list.map((item) => {
        return (
          <li key={item.id}>
            <MovieCard movie={item} />
          </li>
        );
      })}
    </ul>
  );
}
