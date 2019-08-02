import React from 'react';
import  {shallow } from "enzyme";
import StocksGrid from '../StocksGrid';

it('renders without crashing', () => {
  shallow(<StocksGrid />);
});
