import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'
import { randomUUID } from 'crypto'

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (req, reply) =>{
        const voteOPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const votePollParams = z.object({
            pollId: z.string().uuid()
        })

        const { pollId } = votePollParams.parse(req.params)
        const { pollOptionId} = voteOPollBody.parse(req.body)

        let { sessionId } = req.cookies

        if (!sessionId){
            sessionId = randomUUID()
        }

        reply.setCookie('sessionId', sessionId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
            signed: true,
            httpOnly: true,
        })

        return reply.status(201).send({ sessionId })
    })
}