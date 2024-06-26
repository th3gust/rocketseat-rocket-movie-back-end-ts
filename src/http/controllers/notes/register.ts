import { PrismaNotesRepository } from '@/repositories/in-prisma-repositories/in-prisma-notes-repository'
import { PrismaUsersRepository } from '@/repositories/in-prisma-repositories/in-prisma-users-repository'
import { RegisterNoteUseCase } from '@/use-cases/notes/register'
import { InvalidCredentialError } from '@/utils/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerNotes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    rating: z.coerce.number(),
    arr_tags: z.array(z.string()),
  })

  const { title, description, rating, arr_tags } = requestBodySchema.parse(
    request.body,
  )

  try {
    const notesRepository = new PrismaNotesRepository()
    const usersRepository = new PrismaUsersRepository()
    const useCase = new RegisterNoteUseCase(notesRepository, usersRepository)

    const { note } = await useCase.execute({
      user_id: request.user.sub,
      title,
      description,
      rating,
      arr_tags,
    })

    return reply.status(200).send({ note })
  } catch (err) {
    if (err instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err
  }
}
