const cookieParser = require('cookie-parser'),
  jwt = require('jsonwebtoken')

require('dotenv').config({ path: '.env' })
const createServer = require('./createServer'),
  db = require('./db'),
  server = createServer()

server.express.use(cookieParser())

server.express.use((req, res, next) => {
  const { token } = req.cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    req.userId = userId
  }
  next()
})

server.express.use(async (req, res, next) => {
  if (!req.userId) return next()
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{id permissions email name}',
  )
  req.user = user
  console.log(user)
  next()
})

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http:/localhost:${deets.port}`)
  },
)
