import React, { memo } from 'react';
import { useMoviesContext } from '../../../contexts/MoviesContext';
import '../Movies.css';

export const MovieSearch = () => {
    const { debounceHandleSearch, showInTheatersButton, setShowInTheatersButton, fetchMovies, search, setSearch } = useMoviesContext();
    const inputRef = React.useRef();
    const handleClick = (e) => {
        e.preventDefault();
        fetchMovies();
        setShowInTheatersButton(false);
        setSearch(null);
        inputRef.current.value = '';
    }
    const titleText = search && search !== '' ? `Showing results for "${search}"` : 'In theaters now';
    return (
        <>
            <div className="movies__searchbar">
                <input onChange={(e) => debounceHandleSearch(e.target.value)} ref={inputRef} />
                {showInTheatersButton &&
                    <button className="searchbar__goback" type="button" onClick={handleClick}>Go back to what's in theaters now</button>
                }
                <h2 className="searchbar__title">{titleText}</h2>
            </div>
        </>
    );
};

export default memo(MovieSearch);
