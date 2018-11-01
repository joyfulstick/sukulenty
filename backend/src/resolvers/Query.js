const { forwardTo } = require('prisma-binding'),
  { hasPermission, isLoggedin } = require('../utils')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request
    if (!userId) {
      return null
    }
    return ctx.db.query.user(
      {
        where: { id: userId },
      },
      info,
    )
  },
  users(parent, args, ctx, info) {
    isLoggedin(ctx)
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE'])
    return ctx.db.query.users({}, info)
  },
  async order(parent, args, ctx, info) {
    isLoggedin(ctx)
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info,
    )
    const ownsOrder = Object.is(order.user.id, ctx.request.userId)
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      'ADMIN',
    )
    if (!ownsOrder && !hasPermissionToSeeOrder) {
      throw new Error('Nie możesz zobaczyć tego zamówienia')
    }
    return order
  },
  async orders(parent, args, ctx, info) {
    isLoggedin(ctx)
    const { userId } = ctx.request
    return ctx.db.query.orders(
      {
        where: {
          user: { id: userId },
        },
      },
      info,
    )
  },
}

module.exports = Query
