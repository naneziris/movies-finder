import React from 'react';
import MovieList from './MovieList/MovieList';
import MovieSearch from './MovieSearch/MovieSearch';
import './Movies.css';
import { MoviesProvider } from '../../contexts/MoviesContext';

export const Movies = () => {

    return (
        <MoviesProvider>
            <MovieSearch />
            <MovieList />
        </MoviesProvider>
    );
};

export default Movies;