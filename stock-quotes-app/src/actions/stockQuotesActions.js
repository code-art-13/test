import Types from './actionTypes';
import axios from 'axios';
import config from '../config';
import socketIOClient from "socket.io-client";

export const getStockQuotes = (stockQuotes, apiResponseCounter) => ({
    type: Types.GET_STOCK_QUOTES,
    payload: { stockQuotes, apiResponseCounter }
}); 

export const showAPIResponseCount = (counter = 0) => ({
    type: Types.SHOW_API_RESPONSE_COUNT,
    payload: { apiResponseCounter: counter }
}); 

const getStockQuotesError = (error) => ({
    type: Types.GET_STOCK_QUOTES_API_ERROR,
    payload: {stockQuotesError: error }
}); 

export const getStockQuotesFromAPI = () => {
    return (dispatch) => {
        axios.get(`${config.serviceEndPoint}/api/getStockQuotes`)
             .then(response => {
                 return dispatch(getStockQuotes(response.data));
              })
             .catch((error)=>{
                return dispatch(getStockQuotesError(error));
            });
    };
};

export const getStockQuotesFromSocket = () => (dispatch) => {
    const socket = socketIOClient(config.serviceEndPoint);
    socket.on("receiveStocksDataFromAPI", response => {
        console.log(response.counter);
        dispatch(getStockQuotes(response.stockQuotes));
        dispatch(showAPIResponseCount(response.counter));
    });
};
export default getStockQuotes;