import Hapi from "@hapi/hapi"

export async function filterPostsHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ) {
    const { prisma } = request.server.app
  
    const { searchString } = request.query
  
    try {
      const filteredPosts = await prisma.post.findMany({
        where: {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        },
      })
  
      return h.response(filteredPosts).code(201)
    } catch (err) {
      console.log(err)
    }
  }