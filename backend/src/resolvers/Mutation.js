const bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  { randomBytes } = require('crypto'),
  { promisify } = require('util'),
  { transport, makeEmail } = require('../mail'),
  { hasPermission, isLoggedin } = require('../utils')

function setCookieWithToken(user, ctx) {
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
  })
}

const hourMilliseconds = 3600000

const Mutations = {
  createItem(parent, args, ctx, info) {
    isLoggedin(ctx)
    return ctx.db.mutation.createItem(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
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
    const item = await ctx.db.query.item({ where }, '{id title user { id }}')
    const ownsItem = Object.is(item.user.id, ctx.request.userId)
    const hasPermission = ctx.request.user.permissions.some(permision =>
      ['ADMIN', 'ITEMDELETE'].includes(permision),
    )
    if (!ownsItem && !hasPermission) {
      throw new Error('Nie masz uprawnień!')
    }
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

  async requestReset(parent, { email }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } })
    if (!user) {
      throw new Error(`Nie ma użytkownika z emailem ${email}`)
    }
    const randomBytesPromisified = promisify(randomBytes)
    const resetToken = (await randomBytesPromisified(20)).toString('hex')
    const resetTokenExpiry = Date.now() + hourMilliseconds
    const res = await ctx.db.mutation.updateUser({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    })
    await transport.sendMail({
      from: 'sukulenty.pl',
      to: email,
      subject: 'Resetowania hasła',
      html: makeEmail(user.name)(`
      Otrzymałem prośbę o zresetowanie hasła do Twojego konta.
      \n\n
      <a href="${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetToken}">Kliknij</a>, aby wybrać nowe hasło
      `),
    })
    return { message: 'Wysłano wiadomość' }
  },

  async resetPassword(
    parent,
    { password, confirmPassword, resetToken },
    ctx,
    info,
  ) {
    if (password !== confirmPassword) {
      console.log(password, confirmPassword)
      throw new Error('Hasła nie są takie same!')
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken,
        resetTokenExpiry_gte: Date.now() - hourMilliseconds,
      },
    })
    if (!user) {
      throw new Error('Token jest nieprawidłowy lub nieważny!')
    }
    const newPassword = await bcrypt.hash(password, 10)
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password: newPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })
    setCookieWithToken(updatedUser, ctx)
    return updatedUser
  },
  async updatePermissions(parent, args, ctx, info) {
    isLoggedin(ctx)
    const currentUser = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      info,
    )
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE'])
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: { id: args.userId },
      },
      info,
    )
  },
  async addToCart(parent, args, ctx, info) {
    isLoggedin(ctx)
    const { userId } = ctx.request
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    })
    if (existingCartItem) {
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        },
        info,
      )
    }
    return ctx.db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          item: {
            connect: { id: args.id },
          },
        },
      },
      info,
    )
  },
  async removeFromCart(parent, args, ctx, info) {
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{ id, user { id }}`,
    )
    if (!cartItem) throw new Error('Nie znaleziono 🌵')
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('To nie twój 🛒')
    }
    return ctx.db.mutation.deleteCartItem(
      {
        where: { id: args.id },
      },
      info,
    )
  },
}

module.exports = Mutations
