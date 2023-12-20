module.exports = {
  errorResponse: (res, message, status = 400) => {
    return res.status(status).send({
      status,
      error: {
        message,
      },
    })
  },
  successResponse: (res, data, message = 'Request Success', status = 200) => {
    return res.status(status).send({
      status,
      data,
      message,
    })
  },
}
