import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { PrismaClientExtends } from '@prisma/client/extension'

const app = fastify()

const prisma = new PrismaClient()

app.post('/polls', async (req, reply) =>{
    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(req.body)

    const poll = await prisma.poll.create({
        data: {
            title
        }
    })

    return reply.status(201).send(poll)
})

app.listen({ port: 3000}).then(() => {
    console.log('HTTP server running at localhost:3000')
})
