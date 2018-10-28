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

exports.hasPermission = hasPermission
exports.isLoggedin = isLoggedin
