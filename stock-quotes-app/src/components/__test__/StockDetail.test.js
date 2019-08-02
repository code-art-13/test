import React from 'react';
import {shallow} from "enzyme";
import StockDetail from '../StockDetail';

it('renders without crashing', () => {
  shallow(<StockDetail />);
});
