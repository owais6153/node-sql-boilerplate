module.exports = {
  _400: (res, message) => {
    return res.status(400).send({
      status: 400,
      error: {
        message,
      },
    })
  },
  _401: (res, message) => {
    return res.status(401).send({
      status: 401,
      error: {
        message,
      },
    })
  },
  _403: (res, message) => {
    return res.status(403).send({
      status: 403,
      error: {
        message,
      },
    })
  },
  _200: (res, data, message = 'Success') => {
    return res.status(200).send({
      status: 200,
      data,
      message,
    })
  },
  _201: (res, data, message) => {
    return res.status(201).send({
      status: 201,
      data,
      message,
    })
  },
  _500: (res, message) => {
    return res.status(500).send({
      status: 500,
      error: {
        message,
      },
    })
  },
}
