import { Note, Prisma } from '@prisma/client'
import { NoteRepository } from '../interfaces/notes-repository'
import { randomUUID } from 'crypto'

export class InMemoryNotesRepository implements NoteRepository {
  public items: Note[] = []

  async create(data: Prisma.NoteUncheckedCreateInput) {
    const arrTags: string[] = Array.isArray(data.arr_tags) ? data.arr_tags : []

    const note = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      rating: data.rating,
      arr_tags: arrTags,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(note)

    return note
  }

  async fetchAll(user_id: string) {
    const notes = this.items.filter((note) => note.user_id === user_id)

    if (!notes) {
      return null
    }

    return notes
  }

  async findByTitle(title: string) {
    return this.items.filter((item) => item.title.includes(title))
  }

  async findById(id: string) {
    const note = this.items.find((item) => item.id === id)

    if (!note) {
      return null
    }

    return note
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id)
    this.items.splice(index, 1)
  }
}
