import Hapi from "@hapi/hapi"

// type PostCreateInput = PostGetPayload<{
//   select: {
//     title: true,
//     content: true,
//   }
// }> & { authorEmail: string }

export async function createPostHandler(
    request: Hapi.Request,
    h: Hapi.ResponseToolkit,
  ) {
    const { prisma } = request.server.app
    // const payload = request.payload as PostCreateInput
    const payload = request.payload as any
  
    try {
      const createdPost = await prisma.post.create({
        data: {
          title: payload.title,
          content: payload.content,
          author: {
            connect: { email: payload.authorEmail },
          },
        },
        select: {
          id: true,
        },
      })
      return h.response(createdPost).code(201)
    } catch (err) {
      console.log(err)
    }
  }