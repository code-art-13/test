import Types from './actionTypes';
import axios from 'axios';
import config from '../config';

const getStockDetail = stockDetail => ({
    type: Types.GET_STOCK_DETAIL,
    payload: {
        stockDetail: stockDetail,
    }
}); 

const getStockDetailError = (error) => ({
    type: Types.GET_STOCK_DETAIL_API_ERROR,
    payload: {stockDetailError: error }
}); 


export const getStockDetailFromAPI = (symbol) => {
    return (dispatch) => {
        axios.get(`${config.serviceEndPoint}/api/getStockQuotes?symbol=${symbol}`)
             .then(response => {
                 return dispatch(getStockDetail(response.data));
              })
             .catch((error)=>{
                return dispatch(getStockDetailError(error));
            });
    };
};

export default getStockDetail;