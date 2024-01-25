require('dotenv').config()
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3Client = require('../config/s3-bucket')
const fs = require('fs')

const bucket = process.env.BUCKET_NAME

module.exports = {
  multerUpload: multer({
    storage: multerS3({
      s3: s3Client,
      bucket,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key: function (req, file, cb) {
        cb(null, `public/` + Date.now().toString() + '_' + file.originalname)
      },
    }),
  }),
  upload: async (source, destination) => {
    console.log('sending to s3 ...')

    const params = {
      Bucket: bucket,
      Key: destination,
      Body: fs.createReadStream(source),
      ACL: 'public-read',
    }
    try {
      return s3Client.upload(params).promise()
    } catch (error) {
      console.log(error)
      return ''
    }
  },
  read: async (bucketName, fileName) => {
    const params = { Bucket: bucketName, Key: fileName }
    try {
      let data = await s3Client.getObject(params).promise()
      return data
    } catch (error) {
      console.log(error.message)
      throw new Error('File does not exist.')
    }
  },
}
