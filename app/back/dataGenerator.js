'use strict';

function getRnd (min, max) {
  if (typeof min === 'undefined' || typeof max === 'undefined') {
    return 0
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
}

function prepareToEval (text) {
  text = text.split('+')
  var i
  var n = text.length
  var obj = {
    x: [],
    y: function () {
      return 0
    }
  }

  for (i = 0; i < n; i += 1) {
    text[i] = text[i].split('*')
  }

  for (i = 0; i < n; i += 1) {
    for (var j = 0, max_j = text[i].length; j < max_j; j += 1) {
      if (text[i][j].search(/\^/) > 0) {
        text[i][j] = 'Math.pow(' + text[i][j].replace(/\^/, ',') + ')'
      }
    }
  }

  for (i = 0; i < n; i += 1) {
    if (text[i].length > 1) {
      obj.x.push(
        function (text) {
          return function (x) {
            var y = 0
            try {
              y = eval(text)
            } catch(e) {
              console.log(x, e)
            }
            return y
          }
        }(text[i][1])
      )
    }
    text[i] = text[i].join('*')
  }

  text = text.join('+')

  obj.y = function (x) {
    var y = 0
    try {
      y = eval(text)
    } catch(e) {
      console.log(x, e)
    }
    return y
  }
  return obj
}

exports.parabolaData = function parabolaData (data, res) {
  /**
  data
    {
        step - чисо, шаг. По умолчанию 10
        rndFrom - минимальное значение диопазона случайных значений
        rndTo - максимальное значение диопазона случайных значений
        xFrom - минимальное значение Х, по умолчанию -50
        xTo - максимальное значение Х, по умолчанию 50
        A - значение A дял формулы A * x^2 + B * x + C, по умолчанию 2
        B - значение B дял формулы A * x^2 + B * x + C, по умолчанию 3
        C - значение C дял формулы A * x^2 + B * x + C, по умолчанию 4
    }
  **/

  if (typeof data.xFrom === 'undefined') {
    data.xFrom = -50
  } else {
    data.xFrom = parseInt(data.xFrom, 10)
  }

  if (typeof data.xTo === 'undefined') {
    data.xTo = 50
  } else {
    data.xTo = parseInt(data.xTo, 10)
  }

  if (typeof data.step === 'undefined') {
    data.step = 10
  } else {
    data.step = parseInt(data.step, 10)
  }

  if (typeof data.func === 'undefined') {
    data.func = '2*x^2+3*x+4'
  }
  data.func = prepareToEval(data.func)


  var pd = []
  var count = (data.xTo - data.xFrom) / data.step + 1
  var x = 0
  var n = data.func.x.length
  for (var i = 0; i < count; i += 1) {
    x = i * data.step + data.xFrom
    pd.push([])
    for (var j = 0; j < n; j += 1) {
      pd[i].push(data.func.x[j](x))
    }
    pd[i].push(data.func.y(x))
  }
  res(pd)
}
