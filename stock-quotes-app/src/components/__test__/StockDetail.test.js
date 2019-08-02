import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme , {shallow, mount} from "enzyme";
import StockDetail from '../StockDetail';

it('renders without crashing', () => {
  shallow(<StockDetail />);
});
