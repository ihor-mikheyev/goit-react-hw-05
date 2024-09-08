import { NavLink, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage"
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import css from "./Navigation.module.css"

export default function Navigation() { 
    return (
        <>
        <nav className={css.nav}>
            <NavLink to="/" className={css.nav_link}>Home</NavLink>
            <NavLink to="/movies" className={css.nav_link}>Movies</NavLink>
        </nav>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/movies" element={<MoviesPage/>}/>
        </Routes>
        </>
    
    )
}