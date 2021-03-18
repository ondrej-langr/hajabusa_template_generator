import Hapi from '@hapi/hapi'
import { deleteHandler } from './handlers/delete'
import { feedHandler } from './handlers/feed'
import { filterPostsHandler } from './handlers/filterposts'
import { getPostHandler } from './handlers/get'
import { publishHandler } from './handlers/publish'
import {createPostHandler} from './handlers/create'


const usersPlugin = {
  name: 'app/posts',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/post',
        handler: createPostHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/feed',
        handler: feedHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/post/{postId}',
        handler: getPostHandler,
      },
    ])

    server.route([
      {
        method: 'GET',
        path: '/filterPosts',
        handler: filterPostsHandler,
      },
    ])

    server.route([
      {
        method: 'PUT',
        path: '/publish/{postId}',
        handler: publishHandler,
      },
    ])

    server.route([
      {
        method: 'DELETE',
        path: '/post/{postId}',
        handler: deleteHandler,
      },
    ])
  },
}

export default usersPlugin

