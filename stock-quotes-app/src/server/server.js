const express = require('express');
const axios = require('axios') ;
const _ = require('lodash');
const app = express();
const stockQuotesData = require('./mockData'); 

const server = require('http').createServer(app);
const port = 4000;
const io = require('socket.io').listen(server);
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

let interval;

app.use(allowCrossDomain);

app.get('/', (req, res) => {
    res.send({ response: "I am alive" }).status(200);
 });

app.get('/api/getStockQuotes', (req, res) => {
    let response = stockQuotesData;
    if(req.query.symbol) {
      response = _.filter(stockQuotesData, (stockQuote) => {
        return stockQuote.symbol === req.query.symbol;
      })[0];
    }
    res.send(response);
});

server.listen(port);
console.log('Server is running');

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getStocksFromExternalSource(socket), 30000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
let counter = 0;
const getStocksFromExternalSource = async socket => {
    try {
      let data = stockQuotesData;

      // const res = await axios.get("https://api.worldtradingdata.com/api/v1/stock?symbol=NKE,AAPL,MSFT,AMZN,FB&api_token=22rAtaCkfDt5fDy5SAIyzfsj4yhnvZWD5mp7E6pZ4gnLM5n6HyLHQQXtiNmx");
      // data = res.data.data;

      console.log("API_RESPONSE_NUMBER_"+ ++counter);
      console.log(data);

      // Simulating the real time stock by changing price
      data.map((stockQuote, index) => {
        let inceaseBy = (index + 1)/100;
        let increasedPrice = parseFloat(stockQuote.price) + inceaseBy;
        stockQuote.price = parseFloat(increasedPrice).toFixed(2).toString();
        console.log(`Symbol_${stockQuote.symbol}_${stockQuote.price}`);
        let timeStamp = new Date();
        stockQuote.last_trade_time = `${timeStamp.toDateString()} ${timeStamp.toLocaleTimeString()}`;
      });
    socket.emit("receiveStocksDataFromAPI", { stockQuotes: data, counter: counter}); 
    } catch (error) {
      console.error(`Error: ${error}`);
    }
};