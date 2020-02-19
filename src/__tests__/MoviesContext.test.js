import { useMoviesContext, MoviesProvider } from '../contexts/MoviesContext';
import { renderHook } from '@testing-library/react-hooks';

const contextData = {
    loading: true,
    search: '',
    movies: [],
    genres: {},
    page: 1,
    listName: [ 'in-theaters' ],
    totalPages: [],
    fetchGenres: jest.fn(() => Promise.resolve()),
    fetchMovies: jest.fn(() => Promise.resolve()),
    debounceHandleSearch: jest.fn(() => Promise.resolve()),
    showInTheatersButton: false,
    setShowInTheatersButton: jest.fn(),
    setSearch: jest.fn(),
    setPage: jest.fn(),
    setTotalPages: jest.fn(),
    fetchMoreMovies: jest.fn(() => Promise.resolve()),
};

describe('MoviesContext', () => {

test('renders with an empty initial search value', () => {
    const { result: { current } } = renderHook(() => useMoviesContext(), { wrapper: MoviesProvider });
    expect(current.search).toEqual(contextData.search);
  });
});