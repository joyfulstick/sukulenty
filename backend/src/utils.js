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

exports.hasPermission = hasPermission
