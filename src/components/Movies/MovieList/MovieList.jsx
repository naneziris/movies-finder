import React from 'react';
import InfiniteScroll from "react-infinite-scroller";
import MovieItem from '../MovieItem/MovieItem';
import { useMoviesContext } from '../../../contexts/MoviesContext';
import '../Movies.css';

export const MovieList = () => {
    const { movies, loading, page, totalPages, fetchMoreMovies, genres } = useMoviesContext();
    const emptyResults = movies.length === 0;

    const showItemGenres = genresIdsArray => {
        return (
            <div>
                {
                    genresIdsArray.map(id => {
                        return <span key={id}>{genres[id] || ''}</span>;
                    })
                }
            </div>
        )}

    return (
        <>
            <div>
                {loading ?
                    <h4 className="text-center">
                        ...loading
                    </h4> :
                    <ul className="movies-container">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => fetchMoreMovies(page + 1)}
                            hasMore={totalPages > page}
                            loader={
                                <div className="loader" key={0}>
                                Loading ...
                                </div>
                            }
                        >
                            {movies.map(movie => {
                                return <MovieItem key={movie.id} movie={movie} genres={showItemGenres(movie['genre_ids'])} />
                            })}
                        </InfiniteScroll>
                    </ul>
                }
                {emptyResults &&
                    <h4>Sorry, there are no results</h4>
                }
            </div>
        </>
    );
};

export default MovieList;