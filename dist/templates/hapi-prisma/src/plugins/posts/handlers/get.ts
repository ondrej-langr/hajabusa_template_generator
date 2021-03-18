import Hapi from "@hapi/hapi"

export async function getPostHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const { prisma } = request.server.app
  
    const postId = parseInt(request.params.postId, 10)
  
    try {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      })
      return h.response(post || undefined).code(201)
    } catch (err) {
      console.log(err)
    }
}