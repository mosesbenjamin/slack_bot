const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const subjects = require('./elements/subjects.json')

const { SLACK_SIGNING_SECRET, SLACK_BOT_TOKEN } = process.env

const slackEvents = createEventAdapter(SLACK_SIGNING_SECRET)
const web = new WebClient(SLACK_BOT_TOKEN)

const listenForEvents = (app) => {
  app.use('/events', slackEvents.requestListener())

  slackEvents.on('app_mention', (event) => {
    console.log(
      `Received an app_mention event from user ${event.user} in channel ${event.channel}`
    )
    respondToEvents(event.channel)
  })

  // All errors in listeners are caught here. If this weren't caught, the program would terminate.
  slackEvents.on('error', (error) => {
    console.log(`error: ${error}`)
  })
}

const respondToEvents = async (channelId) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: '',
      attachments: [subjects],
    })
    console.log('Message posted!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listenForEvents, respondToEvents }
