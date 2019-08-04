import Types from '../actions/actionTypes';

const stockDetailReducer = (state = {}, action) => {
    switch(action.type){
      case Types.GET_STOCK_DETAIL : {
        return action.payload.stockDetail;
      }
      default :
      return state;
    }
  };

export default stockDetailReducer;