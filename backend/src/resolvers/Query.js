const { forwardTo } = require('prisma-binding')

const Query = {
  async items(parent, AbortSignal, ctx, info) {
    const items = await ctx.db.query.items()
    return items
  },

  item: forwardTo('db'),
}

module.exports = Query
