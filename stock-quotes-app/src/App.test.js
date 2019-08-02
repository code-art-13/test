import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme , {shallow, mount} from "enzyme";
import App from './App';
import StocksGrid from './components/StocksGrid';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders stocks grid', () => {
  const wrapper = shallow(<App />);;
  expect(wrapper.contains(<StocksGrid />)).toBe(true);
});