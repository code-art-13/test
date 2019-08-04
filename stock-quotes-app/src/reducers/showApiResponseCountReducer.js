import Types from '../actions/actionTypes';
const apiResponseCountReducer= (state= 0, action) => {
    switch(action.type){
      case Types.SHOW_API_RESPONSE_COUNT : {
        return action.payload.apiResponseCounter;
      }
      default :
       return state;
    }
  };

  export default apiResponseCountReducer;