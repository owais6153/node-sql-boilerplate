const isJSON = str => {
  if (typeof str !== 'string') return false
  try {
    const result = JSON.parse(str)
    const type = Object.prototype.toString.call(result)
    if (str === 'null') {
      // TODO: check
      return true
    }
    return type === '[object Object]' || type === '[object Array]'
  } catch (err) {
    return false
  }
}

exports.to = promise =>
  promise
    .then(data => {
      const res = isJSON(data) ? JSON.parse(data) : {}
      if (res.errors) {
        throw data
      }
      return [null, data]
    })
    .catch(err => [err])
