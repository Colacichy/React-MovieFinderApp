import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
import './App.css'
import moonIcon from './moon-svgrepo-com.svg'
import sunIcon from './sun-svgrepo-com.svg'

const API_URL = "http://www.omdbapi.com?apikey=YOUR_API_KEY";

/**
 * Main App component that renders the movie search UI.
 * It includes a theme toggle feature, movie search functionality, and displays movie results.
 *
 * @returns {JSX.Element} The App component
 */
function App() {
  /** @type {string} Current theme of the app ('light' or 'dark') */
  const [theme, setTheme] = useState('light');

  /**
   * Toggles between 'light' and 'dark' themes.
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  /**
   * Applies or removes the 'dark-theme' class to the document body
   * based on the current theme.
   */
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  /** @type {Array<Object>} List of movies fetched from the API */
  const [movies, setMovies] = useState([]);

  /** @type {string} The search term entered by the user */
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches a list of movies based on the search term.
   *
   * @param {string} title The movie title to search for
   */
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieFinder</h1>
      <img 
        style={{ cursor: 'pointer', width: '50px', height: '50px' }}
        onClick={toggleTheme} 
        src={theme === 'light' ? sunIcon : moonIcon} 
        alt={theme === 'light' ? "light" : "dark"} 
      />
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
      </div>
      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
