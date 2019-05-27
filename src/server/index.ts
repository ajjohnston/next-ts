/* tslint:disable no-console */
import * as express from 'express'
import * as next from 'next'

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err: Error) => {
      if (err) {
        throw err
      }

      console.info(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
