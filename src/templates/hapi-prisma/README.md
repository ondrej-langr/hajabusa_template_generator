# Generator for easier and faster backend dev

There is HAPI for making you hapi. Theres also typescript, prisma and others ;)

Docker ready btw ;)


**Before anything, run this command**: `npx prisma generate`

To start developing: `yarn dev`
To build: `yarn build`
To start server: `yarn start`

## File structure

📦db *files related to the database since this project uses sqlite*
 ┣ 📜dev.db
 ┗ 📜dev.db-journal
📦dist *only dist files - run 'yarn dev / npm run dev' atleast once to get it*
📦prisma
 ┣ 📂migrations *Migrations that has been run on this project*
 ┃ ┣ 📂20210318073701_init
 ┃ ┃ ┗ 📜migration.sql
 ┃ ┗ 📜migration_lock.toml
 ┗ 📜schema.prisma *prisma schema - you can edit whatever here. Database connection, schema...*
📦src *folder in which you can find everything related to overall logic - aka devs starting point (atomic file structure only ❤)*
 ┣ 📂plugins *everything related to plugins that hapi uses*
 ┃ ┣ 📂posts *posts plugin - takes care of creating posts entrypoints*
 ┃ ┃ ┣ 📂handlers *handlers for each entrypoint declared in posts plugin in ../index.ts*
 ┃ ┃ ┃ ┣ 📜create.ts
 ┃ ┃ ┃ ┣ 📜delete.ts
 ┃ ┃ ┃ ┣ 📜feed.ts
 ┃ ┃ ┃ ┣ 📜filterposts.ts
 ┃ ┃ ┃ ┣ 📜get.ts
 ┃ ┃ ┃ ┗ 📜publish.ts
 ┃ ┃ ┗ 📜index.ts *entrypoint to posts plugin*
 ┃ ┣ 📜prisma.ts *prisma plugin - takes care of creating the prisma instance and attaches it to the api as a plugin*
 ┃ ┗ 📜users.ts *users plugin - takes care of creating user entrypoints*
 ┗ 📜app.ts *starting point in this project*

## REST API UNDER 🔍

You can access the REST API of the server using the following endpoints:

### `GET`

- `/post/:id`: Fetch a single post by its `id`
- `/feed`: Fetch all _published_ posts
- `/filterPosts?searchString={searchString}`: Filter posts by `title` or `content`

### `POST`

- `/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

### `PUT`

- `/publish/:id`: Publish a post by its `id`

### `DELETE`

- `/post/:id`: Delete a post by its `id`