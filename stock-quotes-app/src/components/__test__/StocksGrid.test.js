import React from 'react';
import  {shallow } from "enzyme";
import StockDetail from '../StockDetail';

it('renders without crashing', () => {
  shallow(<StocksGrid />);
});

it('renders stock detail', () => {
  const wrapper = shallow(<StocksGrid />);;
  expect(wrapper.contains(<StockDetail />)).toBe(true);
});