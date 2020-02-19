import React, { useState, useEffect, useContext, useCallback } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { MOVIES_IN_THEATER_URL, MOVIES_SEARCH_URL, MOVIES_GENRES_URL } from '../config/constants';

const MoviesContext = React.createContext();

const MoviesProvider = (props) => {

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState([]);
    const [listName, setListName] = useState(['in-theaters']);
    const [genres, setGenres] = useState({});
    const [loading, setLoading] = useState(true);
    const [showInTheatersButton, setShowInTheatersButton] = useState(false);
    const [search, setSearch] = useState('');

    /**
     * Fetches a list of all genres
     * Flattens the object and sets it at the Context
     */
    const fetchGenres = useCallback(async () => {
        // Genres do not change often, so If we have already fetched them and placed in Context
        // do not fetch again
        if (!_isEmpty(genres)) return;
        try {
            const genresData = await fetch(MOVIES_GENRES_URL);
            const genres = await genresData.json();
            const flattenedGenresObject = Object.assign({}, ...genres.genres.map(object => ({[object.id]: object.name})));
            setGenres(flattenedGenresObject);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }, [genres]);

    /**
     * Fetches the movies that are "in theater now"
     * Returns array objects
     * @param {number} page 
     */
    const fetchMovies = useCallback( async (page = 1) => {
        try {
            const movieData = await fetch(`${MOVIES_IN_THEATER_URL}&page=${page}`);
            const moviesInTheater = await movieData.json();
            setMovies(moviesInTheater.results);
            setPage(moviesInTheater.page);
            setTotalPages(moviesInTheater.total_pages);
            setListName('in-theaters');
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }, []);


    /**
     * Debounce method used for limiting the number of
     * requests made from the handleSearch
     * @param {function} fn 
     * @param {*number} time 
     */
    const debounce = (fn, time) => {
        let timeout;

        return function() {
            const functionCall = () => fn.apply(this, arguments);

            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        };
    };

    /**
     * Returns an array of movies objects based on the search term (value)
     * and the requested page
     * @param {string} value 
     * @param {*number} page 
     */
    const handleSearch = useCallback( async (value, page = 1) => {
        if (!value || value === '') {
            setSearch(null);
            return fetchMovies();
        }
        try {
            setLoading(true);
            const response = await fetch(`${MOVIES_SEARCH_URL}&query=${value}&page=${page}`);
            const searchRelatedMovies = await response.json();
            setMovies(searchRelatedMovies.results);
            setPage(searchRelatedMovies.page);
            setTotalPages(searchRelatedMovies.total_pages);
            setListName('search-results');
            setSearch(value);
            setLoading(false);
            setShowInTheatersButton(true);
        } catch (e) {
            console.log(e);
        }
    }, []);

    /**
     * Fetches the next page of the movies list
     * If current listName is 'search-results' it uses the "movie search" endpoint
     * else it uses the "in theater now" endpoint
     * Pushes the new movie objects to the existing array of objects in Context
     * @param {number} page 
     */
    const fetchMoreMovies = useCallback( async (page = 2) => {
        let movieData;
        try {
            if(listName === 'search-results') {
                movieData = await fetch(`${MOVIES_SEARCH_URL}&query=${search}&page=${page}`);
            } else {
                movieData = await fetch(`${MOVIES_IN_THEATER_URL}&page=${page}`);
            }
            const newMovies = await movieData.json();
            setMovies([...movies, ...newMovies.results]);
            setPage(newMovies.page);
            setTotalPages(newMovies.total_pages);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }, [listName, movies, search]);

    const debounceHandleSearch = useCallback(debounce(handleSearch, 900), []);

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);
    
      return (
        <MoviesContext.Provider value={{
            loading,
            search,
            movies,
            genres,
            page,
            listName,
            totalPages,
            fetchGenres,
            fetchMovies,
            debounceHandleSearch,
            showInTheatersButton,
            setShowInTheatersButton,
            setSearch,
            setPage,
            setTotalPages,
            fetchMoreMovies,
        }}>
            {props.children}
        </MoviesContext.Provider>
      )
    }
/**
 * Custom hook to consume the MoviesContext
 */
function useMoviesContext() {
    return useContext(MoviesContext);
}

export { MoviesProvider,  useMoviesContext }