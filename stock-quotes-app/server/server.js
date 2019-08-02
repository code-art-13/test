const express = require('express')
const app = express()
const port = 3001

app.get('/getStocks', (req, res) => res.send({
    success: true,
    message: "stocks api"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))