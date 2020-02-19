import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { mount, configure, shallow } from 'enzyme';
import MovieItem from '../components/Movies/MovieItem/MovieItem';

configure({adapter: new Adapter()});

jest.mock('../contexts/MoviesContext', () => ({useMoviesContext: jest.fn()}));

const props = {
    genres: [<span className="movies__genre" key={1}>Adventure</span>],
    movie: {
        id: 1,
        title: "Niko's Movie",
        poster_path: "",
        release_date: "2019",
        overview: "Just a movie",
        vote_average: '10',
        genre_ids: [1],
} };

describe('MovieList', () => {
  test('Should display one li component if one movie is passed', () => {
      const wrapper = shallow(<MovieItem {...props} />);
      expect(wrapper.find('li')).toHaveLength(1);
    });
  test('Should display the title passed from props', () => {
      const wrapper = shallow(<MovieItem {...props} />);
      const title = wrapper.find('.movie__title');
      expect(title.text()).toEqual("Niko's Movie");
    });
  test('Should display the release date passed from props', () => {
      const wrapper = shallow(<MovieItem {...props} />);
      const date = wrapper.find('.movie__date');
      expect(date.text()).toEqual("2019");
    });
  test('Should display the description passed from props', () => {
      const wrapper = shallow(<MovieItem {...props} />);
      const desc = wrapper.find('.movie__description');
      expect(desc.html()).toEqual('<h3 class="movie__description">Description<p>Just a movie</p></h3>');
    });
  test('Should display the genres passed from props', () => {
      const wrapper = mount(<MovieItem {...props} />);
      const genres = wrapper.find('.movies__genre');
      expect(genres.text()).toEqual("Adventure");
    });
  test('Should match the snapshot', () => {
    const tree = renderer.create(<MovieItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});