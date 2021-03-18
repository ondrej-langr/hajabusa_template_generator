import Hapi from '@hapi/hapi'

export async function feedHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
  
    try {
      const createdPost = await prisma.post.findMany({
        where: { published: true },
        include: { author: true },
      })
      return h.response(createdPost).code(201)
    } catch (err) {
      console.log(err)
    }
}