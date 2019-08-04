import thunk from 'redux-thunk';
import { applyMiddleware, compose, combineReducers, createStore} from 'redux';
import stockDetailReducer from './reducers/stockDetailReducer';
import stockQuotesReducer from './reducers/stockQuotesReducer';
import apiResponseCountReducer from './reducers/showApiResponseCountReducer';

const allReducers = combineReducers({
  stockDetail: stockDetailReducer,
  stockQuotes: stockQuotesReducer,
  apiResponseCounter: apiResponseCountReducer,
});

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(
  allReducers, 
  {
    stockDetail: null,
    stockQuotes: [],
    apiResponseCounter: 0,
  },
  allStoreEnhancers,
);

export default store;
