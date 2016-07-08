'use strict';

exports.getCorelation = function getCorelation (coords, res) {

  var obj = {}
  obj.matrix = getMatrix(coords)
  obj.vars = []
  var tmp = copyArr(obj.matrix)
  var tmp1
  for (var i = 0, max_i = coords[0].length; i < max_i; i += 1) {
    tmp1 = copyArr(tmp)
    console.log(tmp)
    obj.vars.push(getVars(tmp))
    tmp = normalize(tmp1)
  }

  res(obj)
}

function getMatrix (coords) {
  var length = coords[0].length
  var arr = []
  /*
    strings like A1*E(x1*xm) + A2*E(x2*xm) + ... + An-1*E(xn-1*xm) + An*Exm = E(xn*xm) where 0 > m => n
  */
  for (var i = 0, n = length - 1; i < n; i += 1) {
    arr.push([])
    arr[i].push(sum(coords, [i]))
    for (var j = 0; j < length; j += 1) {
      arr[i].push(sum(coords, [i, j]))
    }
  }
  /*
    add last string A1*Ex1 + A2*Ex2 + ... + An-1*Exn-1 + An*n = Exn
  */
  arr.push([])
  arr[n].push(coords.length)
  for (var z = 0; z < length; z += 1) {
    arr[n].push(sum(coords, [z]))
  }

  return copyArr(arr) // move [m,0] to [m, m-2] where 0 > m => n
}

function sum (arr, pos) {
  var sum = 0
  for (var i = 0, max_i = arr.length; i < max_i; i += 1) {
    var mult = 1
    for (var j = 0, max_j = pos.length; j < max_j; j += 1) {
      mult *= arr[i][pos[j]]
    }
    sum += mult
  }
  return sum
}

function normalize (arr) {
  for (var i = 0, max_i = arr.length; i < max_i; i += 1) {
    arr[i].unshift(arr[i].splice(max_i - 1, 1)[0])
  }
  return arr.slice()
}

function getVars (arr) {
  var start = 0
  var coef = 0
  //console.log(arr)
  for (var i = 1, max_i = arr.length; i < max_i; i += 1) {
    start = i - 1
    for (var k = i; k < max_i; k += 1) {
      //console.log('[', k, ',', start, '] / [', start, ',', start, ']')
      coef = arr[k][start] / arr[start][start]
      for (var l = start, max_l = arr[k].length; l < max_l; l += 1) {
        //console.log('[', k, ',', l, '] - [', start, ',', l, '] * coef')
        //, arr[k][l] - arr[start][l] * coef
        //console.log(arr[k][l], arr[start][l], coef)
        arr[k][l] = arr[k][l] - arr[start][l] * coef
      }
    }
  }
  //console.log(arr)
  //console.log('[', max_i - 1, ',', max_i, '] / [', max_i - 1, ',', max_i - 1, ']', arr[max_i - 1][max_i] / arr[max_i - 1][max_i - 1])
  return arr[max_i - 1][max_i] / arr[max_i - 1][max_i - 1]
}

function copyArr (arr) {
  var arr1 = []
  for (var i = 0, max_i = arr.length; i < max_i; i += 1) {
    if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
      arr1.push(copyArr(arr[i]))
    } else {
      arr1.push(arr[i])
    }
  }
  return arr1.slice()
}
