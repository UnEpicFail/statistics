'use strict';

function getRnd (min, max) {
  if (typeof min === 'undefined' || typeof max === 'undefined') {
    return 0
  }

  return Math.floor(Math.random() * (max - min + 1)) + min
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
  }

  data.xFrom = parseInt(data.xFrom, 10)

  if (typeof data.xTo === 'undefined') {
    data.xTo = 50
  }

  data.xTo = parseInt(data.xTo, 10)

  if (typeof data.step === 'undefined') {
    data.step = 10
  }

  data.step = parseInt(data.step, 10)

  if (typeof data.A === 'undefined') {
    data.A = 2
  }

  data.A = parseInt(data.A, 10)

  if (typeof data.B === 'undefined') {
    data.B = 3
  }

  data.B = parseInt(data.B, 10)

  if (typeof data.C === 'undefined') {
    data.C = 4
  }

  data.C = parseInt(data.C, 10)

  var pd = []
  var count = (data.xTo - data.xFrom) / data.step + 1
  var x = 0
  for (var i = 0; i < count; i += 1) {
    x = i * data.step + data.xFrom
    pd.push([
      x,
      Math.pow(x, 2),
      data.A * Math.pow(x, 2) + data.B * x + data.C + parseInt(getRnd(data.rndFrom, data.rndTo), 10)
    ])
  }
  res(pd)
}
