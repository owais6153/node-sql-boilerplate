require('dotenv').config()
const { S3Client } = require('@aws-sdk/client-s3')

const cred = {
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
}

const s3Client = new S3Client(cred)

module.exports = s3Client
