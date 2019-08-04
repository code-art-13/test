
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Implementation
I used the socket IO to make an async call to an external api every 30 secs and emit an event after the success of the call. On the UI socket client is configured to listen in for that event and load the data. 

The external api allows only 250 requests per day, so i mocked the data and tried to simulate the real time data by changing the stock price and send to ui every 30 secs.

Used redux pattern for action handling on the UI.

User mostly dom elements, some custom styling and MUI-DataTable package for the Table.

# Instructions
Please run `npm install` 

## To start the nodejs api run
 - Run `node src/server/server.js`
 - check http://localhost:4000/api/getStockQuotes which returns some mock data
 - http://localhost:4000/api/getStockQuotes?symbol=NKE will return stock detail data which is from mock again.
 - the real time data for getStockQuotes url is https://api.worldtradingdata.com/api/v1/stock?symbol=NKE,AAPL,MSFT,AMZN,FB&api_token=
 - token 22rAtaCkfDt5fDy5SAIyzfsj4yhnvZWD5mp7E6pZ4gnLM5n6HyLHQQXtiNmx 
 ### NOTE: It gives only 250 requests per day so i have a timer to have it call every 30secs so approimately 100mins - 125mins it will give the responses.

## To start ui steps
  - Run `npm start`
  - got to http://localhost:3000/













