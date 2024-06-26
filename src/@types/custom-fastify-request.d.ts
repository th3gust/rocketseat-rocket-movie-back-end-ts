import 'fastify/FastifyRequest'

declare module 'fastify' {
  export interface FastifyRequest {
    file: {
      fieldname: string
      originalname: string
      encoding: string
      mimetype: string
      destination: string
      filename: string
      path: string
      size: number
    }
  }
}
