import React, { memo, useState } from 'react'
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import './MovieItem.css';
import { API_KEY, IMAGE_PATH_BASE } from '../../../config/constants';

const MovieItem = props => {
    const {movie, genres} = props;
    const { id, title, poster_path, release_date, overview, vote_average } = movie;
    const [openInfo, setOpenInfo] = useState(false);
    const [movieVideos, setMovieVideos] = useState([]);
    const [movieReviews, setMovieReviews] = useState([]);
    const [movieSimilar, setMovieSimilar] = useState([]);
    const yearOfRelease = new Date(release_date).getFullYear() || '';

    /**
     * Fetch videos, reviews and similar movies
     * and set them on local state
     * along with openInfo
     */
    const handleShowInfo = async (e) => {
        const {id} = e.target.dataset;
        const movieVideosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US&page=1`);
        const movieVideos = await movieVideosResponse.json();
        const movieReviewsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
        const movieReviews = await movieReviewsResponse.json();
        const movieSimilarResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
        const movieSimilar = await movieSimilarResponse.json();
        setMovieVideos(movieVideos.results);
        setMovieReviews(movieReviews.results);
        setMovieSimilar(movieSimilar.results);
        setOpenInfo(!openInfo);
    }

    const CTAlabel = !openInfo ? 'More Info' : 'Hide Info';
    const itemOpenExtraClass = openInfo ? "open" : '';

    /**
     * Helper function to construct the youtube video url
     * with the youtube key we get from the response
     * @param {string} key 
     */
    const constructVideoUrl = (key) => {
        return `https://www.youtube.com/embed/${key}?autoplay=0&rel=0`;
    }
    return (
        <li className={`movie ${itemOpenExtraClass}`}>
            <div className="movie__container">
                <div className="movie__media">
                    <img src={`${IMAGE_PATH_BASE}${poster_path}`} alt={title} />
                </div>
                <div className="movie__body">
                    <h2 className="movie__title">{title}</h2>
                    <h5 className="movie__date">{yearOfRelease}</h5>
                    <h5 className="movie_average">{vote_average}</h5>
                    <h3 className="movie__description">
                        Description
                        <p>{overview}</p>
                    </h3>
                    <div>{genres}</div>
                    <button className="movie__btn" type="button" data-id={id} onClick={handleShowInfo}>{CTAlabel}</button>
                </div>
            </div>
            {openInfo ?
                <div className="movie__footer">
                    {movieVideos && movieVideos.length > 0 &&
                    <>
                        <h3>Trailers</h3>
                        <div className="movie__trailer">
                            {movieVideos.map(video => {
                                return (
                                    <iframe
                                        key={video.id}
                                        title={video.name}
                                        width="200"
                                        height="200"
                                        src={constructVideoUrl(video.key)}
                                        frameBorder="0"
                                        allowFullScreen
                                    />
                                )
                            })}
                        </div>
                    </>
                    }
                    {movieReviews && movieReviews.length > 0 &&
                    <>
                        <h3>Reviews</h3>
                        <ul className="movie__reviews">
                            {movieReviews.slice(0, 2).map(review => {
                                return (
                                    <li className="review" key={review.id}>
                                        <h3 className="review__author">{review.author}</h3>
                                        <p className="review__text">{review.content}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                    }
                    {movieSimilar && movieSimilar.length > 0 &&
                    <>
                        <h3>Similar movies</h3>
                        <ul className="movie__similar">
                            {movieSimilar.map(similar => {
                                return (
                                    <li className="similar" key={similar.id}>
                                        <h4 className="similar__title">{similar.title}</h4>
                                        <img
                                            className="similar__poster"
                                            src={`${IMAGE_PATH_BASE}${similar.poster_path}`}
                                            alt={similar.title}
                                        />
                                        <h5 className="similar__vote">{similar.vote_average}</h5>
                                    </li>
                                )
                            })}
                        </ul>
                    </>
                    }
                    <button className="movie__btn" type="button" data-id={id} onClick={handleShowInfo}>{CTAlabel}</button>
                </div>
            : null}
        </li>
    );
};

MovieItem.propTypes = {
    movie: PropTypes.object.isRequired,
    genres: PropTypes.node.isRequired,
};

const areEqual = (prevProps, nextProps) => {
    return (
        _isEqual(prevProps.movie, nextProps.movie) &&
        _isEqual(prevProps.genres, nextProps.genres)
    );
};

export default memo(MovieItem, areEqual);