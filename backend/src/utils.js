function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave),
  )
  if (!matchedPermissions.length) {
    throw new Error(`Nie masz wystarczających uprawnień

      : ${permissionsNeeded}

      Masz następujące uprawnienia:

      ${user.permissions}
      `)
  }
}

function isLoggedin(ctx) {
  if (!ctx.request.userId) {
    throw new Error('Musisz być zalogowany')
  }
}

async function ownsItem(where, ctx, permits = ['ADMIN']) {
  const item = await ctx.db.query.item({ where }, '{id title user { id }}')
  const ownsItem = Object.is(item.user.id, ctx.request.userId)
  const hasPermission = ctx.request.user.permissions.some(permision =>
    permits.includes(permision),
  )
  if (!ownsItem && !hasPermission) {
    throw new Error('Nie masz uprawnień!')
  }
}

exports.hasPermission = hasPermission
exports.isLoggedin = isLoggedin
exports.ownsItem = ownsItem
