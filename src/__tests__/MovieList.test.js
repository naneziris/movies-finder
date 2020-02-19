import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import MovieList from '../components/Movies/MovieList/MovieList';
import * as MoviesContext from '../contexts/MoviesContext';

configure({adapter: new Adapter()});

jest.mock('../contexts/MoviesContext', () => ({useMoviesContext: jest.fn()}));

describe('MovieList', () => {
test('Should display an h4 loading text if loading is set to true', () => {
    const contextValues = { loading: true };
    jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const wrapper = shallow(<MovieList />);
    const h4 = wrapper.find('h4');
    expect(h4.text()).toEqual('...loading');
  });
test('Should display the no result text in case there are no results', () => {
    const contextValues = { loading: false, movies: [] };
    jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const wrapper = shallow(<MovieList />);
    const h4 = wrapper.find('h4');
    expect(h4.text()).toEqual('Sorry, there are no results');
  });
test('Should display one movieItem component in case one movie is returned', () => {
    const contextValues = {
        loading: false,
        genres: {1: 'adventure'},
        movies: [{
            id: 1,
            title: "Niko's Movie",
            poster_path: "",
            release_date: "2019",
            overview: "Just a movie",
            vote_average: '10',
            genre_ids: [1],
    }] };
    jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const wrapper = mount(<MovieList />);
    expect(wrapper.find('MovieItem')).toHaveLength(1);

  });
  test('Should match the snapshot', () => {
    const contextValues = {
      loading: false,
      genres: {1: 'adventure'},
      movies: [{
          id: 1,
          title: "Niko's Movie",
          poster_path: "",
          release_date: "2019",
          overview: "Just a movie",
          vote_average: '10',
          genre_ids: [1],
  }] };
  jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const tree = renderer.create(<MovieList />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});