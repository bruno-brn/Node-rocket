import fastify from 'fastify'
import cookie from '@fastify/cookie'
import Websocket from '@fastify/websocket'
import { createPoll } from './routes/create-poll'
import { getPoll } from './routes/get-polls'
import { voteOnPoll } from './routes/vote-on-poll'
import { pollResults } from './ws/poll-result'

const app = fastify()

app.register(cookie, {
  secret: 'polls--app-nlw',
  hook: 'onRequest',
  parseOptions: {},
})

app.register(Websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app.listen({ port: 3000 }).then(() => {
  console.log('HTTP server running at localhost:3000')
})
