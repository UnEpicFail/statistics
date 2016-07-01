var express = require('express')
var app = express()
var pow2Func = require('./back/pow2Func.js')
var talk = require('./back/talk.js')
var dataGenerator = require('./back/dataGenerator.js')

app.use('/', express.static('app/public/'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/pow2Func', function (req, res) {
  talk.sayOk('OK', res)
  //pos2Func.getCorelation()
})

app.get('/api/parabolaData', function (req, res) {
  dataGenerator.parabolaData(req.query, function (data) {
    talk.sayOk(data, res)
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
