require('dotenv').config()
const LaunchDarkly = require('launchdarkly-node-server-sdk')
ldClient = LaunchDarkly.init(process.env.LD_SDK_KEY)

const express = require('express')
const app = express()
const pinoLogger = require('pino-http')({
  level: 'error',
})
const PORT = 3000
const LD_USER = { key: 'toggle-runner-server' }

// Updates logging level
ldClient.on('update:logging-level', () => {
  ldClient.variation('logging-level', LD_USER, 'info', (err, logLevel) => {
    console.log(
      `Logging level changed from ${pinoLogger.logger.level} to ${logLevel}`
    )
    pinoLogger.logger.level = logLevel
  })
})

app.set('view engine', 'ejs')
app.use(pinoLogger)
app.use(express.static('public'))

app.get('/', (req, res) => {
  req.log.debug('Starting game...')
  res.render('game')
})

app.listen(PORT, () => {
  console.log(`Toggle Runner listening at http://localhost:${PORT}`)
})
