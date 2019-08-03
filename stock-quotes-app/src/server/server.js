const express = require('express');
const axios = require('axios') ;
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

app.get('/api/getStocks', (req, res) => res.send(stockQuotesData))

server.listen(port);
console.log('Server is running');

io.on("connection", socket => {
    console.log("New client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getStocksFromExternalSource(socket), 1000);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
const getStocksFromExternalSource = async socket => {
    try {
      let data = stockQuotesData;
      // const res = await axios.get("https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=22rAtaCkfDt5fDy5SAIyzfsj4yhnvZWD5mp7E6pZ4gnLM5n6HyLHQQXtiNmx");
      // data = res.data.data;
      data.map((stockQuote, index) => {
        let inceaseBy = (index + 1)/100;
        let increasedPrice = parseFloat(stockQuote.price) + inceaseBy;
        stockQuote.price = parseFloat(increasedPrice).toFixed(2).toString();
        console.log(`Symbol_${stockQuote.symbol}_${stockQuote.price}`);
        let timeStamp = new Date();
        stockQuote.last_trade_time = `${timeStamp.toDateString()} ${timeStamp.toLocaleTimeString()}`;
      });
    socket.emit("receiveStocksDataFromAPI", data); 
    } catch (error) {
      console.error(`Error: ${error}`);
    }
};