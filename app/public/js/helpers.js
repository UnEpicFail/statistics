var app = {}

app.Silence = false

app.Log = function () {
  if (app.Silence) {
    return
  }
  console.log.apply(console, arguments)
}

app.Message = function (type, title, msg, cd) {
  var div = document.createElement('div')
  var h2 = document.createElement('h2')
  var p = document.createElement('p')
  var holder = document.getElementById('messagesHolder')
  var handler = null
  if (!holder) {
    holder = document.createElement('div')
    holder.id = 'messagesHolder'
    document.getElementsByTagName('body')[0].appendChild(holder)
  }
  div.className += 'message ' + type
  div.appendChild(h2)
  div.appendChild(p)
  holder.appendChild(div)
  h2.innerHTML = title
  p.innerHTML = msg
  handler = setHideTimeout(div, holder)
  div.onmouseover = function () {
    clearTimeout(handler)
    handler = null
  }
  div.onmouseout = function () {
    clearTimeout(handler)
    handler = null
    handler = setHideTimeout(div, holder)
  }

  function setHideTimeout (div, holder) {
    return setTimeout(function () {
      div.className += (div.className.length > 0) ? ' fadeout' : 'fadeout'
      setTimeout(function () {
        holder.removeChild(div)
      }, 500)
    }, (cd || 1000))
  }
}

app.paramsToUrl = function (url, params) {
  var str = []
  for (var i in params) {
    str.push(i + '=' + params[i])
  }
  return url + '?' + str.join('&')
}
