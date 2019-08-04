import Types from '../actions/actionTypes';
const stockQuotesReducer = (state= { stockQuotes:[], apiResponseCounter: 0}, action) => {
    switch(action.type){
      case Types.GET_STOCK_QUOTES : {
        return action.payload.stockQuotes;
      }
      case Types.SHOW_API_RESPONSE_COUNT : {
        state.apiResponseCounter = action.payload.apiResponseCounter
        return state;
      }
      case Types.GET_STOCK_QUOTES_API_ERROR : {
          return action.payload.stockQuotesError;
      }
      default :
       return state;
    }
  };

  export default stockQuotesReducer;