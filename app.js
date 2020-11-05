const express = require('express')
const app = express()
const pinoLogger = require('pino-http')({
  level: 'error',
})
const PORT = 3000

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
