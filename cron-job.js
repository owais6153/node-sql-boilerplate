// register all cron jobs here in this file
const cron = require('node-cron')
const testJob = require('@jobs/test')

cron.schedule('* * * * *', testJob)
