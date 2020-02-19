import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import MovieSearch from '../components/Movies/MovieSearch/MovieSearch';
import * as MoviesContext from '../contexts/MoviesContext';

configure({adapter: new Adapter()});

jest.mock('../contexts/MoviesContext', () => ({useMoviesContext: jest.fn()}));

describe('MovieSearch', () => {
test('Should display a showInTheatersButton when context has it set as true', () => {
    const contextValues = { showInTheatersButton: true };
    jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const wrapper = shallow(<MovieSearch />);
    const button = wrapper.find('.searchbar__goback');
    expect(button.exists()).toBe(true);
  });
  test('Should display Showing results for [the provided search term] as a title', () => {
    const contextValues = { search: 'The Godfather' };
    jest.spyOn(MoviesContext, 'useMoviesContext').mockImplementation(() => contextValues);
    const wrapper = shallow(<MovieSearch />);
    const title = wrapper.find('.searchbar__title');
    expect(title.text()).toEqual('Showing results for "The Godfather"');
  });
});