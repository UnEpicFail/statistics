'use strict';

exports.sayOk = function sayOk (data, res) {
  res.send(JSON.stringify({
    data: data,
    success: true,
    error: false
  }))
}

exports.sayNotOk = function sayNotOk (data, res) {
  res.send(JSON.stringify({
    data: data,
    success: false,
    error: true
  }))
}
