import React, { memo } from 'react';
import InfiniteScroll from "react-infinite-scroller";
import _isEqual from 'lodash/isEqual';
import MovieItem from '../MovieItem/MovieItem';
import { useMoviesContext } from '../../../contexts/MoviesContext';
import '../Movies.css';

export const MovieList = () => {
    const { movies, loading, page, totalPages, fetchMoreMovies, genres } = useMoviesContext();
    const emptyResults = movies?.length === 0;

    const showItemGenres = genresIdsArray => (
        <>
            {
                genresIdsArray.map(id => {
                    return <span className="movies__genre" key={id}>{genres[id] || ''}</span>;
                })
            }
        </>
    )

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
                            {movies.map((movie, i) => {
                                return <MovieItem key={`${movie.id}-${i}`} movie={movie} genres={showItemGenres(movie['genre_ids'])} />
                            })}
                        </InfiniteScroll>
                    </ul>
                }
                {emptyResults &&
                    <h4 className="movies__empty">Sorry, there are no results</h4>
                }
            </div>
        </>
    );
};

const areEqual = (prevProps, nextProps) => {
    return (
        _isEqual(prevProps.movies, nextProps.movies) &&
        _isEqual(prevProps.genres, nextProps.genres) &&
        prevProps.fetchMoreMovies === nextProps.fetchMoreMovies &&
        prevProps.loading === nextProps.loading &&
        prevProps.page === nextProps.page
    );
};

export default memo(MovieList, areEqual);