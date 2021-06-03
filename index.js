if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')

const events = require('./events')
const interactions = require('./interactions')
const slashCommand = require('./slashCommand')

const port = process.env.PORT
const app = express()

events.listenForEvents(app)
interactions.listenForInteractions(app)
slashCommand.listenForCommands(app)

app.listen(port, function () {
  console.log(`Server is listening on port ${port}`)
})
