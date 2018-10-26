const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function setCookieWithToken(user, ctx) {
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  })
}

const Mutations = {
  createItem(parent, args, ctx, info) {
    return ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info,
    )
  },

  updateItem(parent, args, ctx, info) {
    const updates = { ...args }
    delete updates.id
    return ctx.db.mutation.updateItem(
      { data: updates, where: { id: args.id } },
      info,
    )
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    const item = await ctx.db.query.item({ where }, `{id title}`)
    return ctx.db.mutation.deleteItem({ where }, info)
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info,
    )
    setCookieWithToken(user, ctx)
    return user
  },

  async signin(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`Nie ma użytkownika z emailem ${email}`)
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Błędne hasło')
    }
    setCookieWithToken(user, ctx)
    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'Wylogowano' }
  },
}

module.exports = Mutations
