const express = require('express');
const axios = require('axios') ;
const app = express();
const server = require('http').createServer(app);
const port = 4000;
const stockQuotesData = require('./mockData'); 

app.get('/', (req, res) => {
    res.send({ response: "I am alive" }).status(200);
 });

app.get('/getStocks', (req, res) => res.send(stockQuotesData))

server.listen(port);
console.log('Server is running');