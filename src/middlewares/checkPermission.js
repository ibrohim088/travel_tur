const checkPermission = (requiredPermission) => (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" })
  }

  // admin: полный доступ
  if (user.role === "admin") {
    return next()
  }

  // user: проверяем permissions
  if (user.permissions?.[requiredPermission] === true) {
    return next()
  }

  return res.status(403).json({
    msg: `Access denied. You don't have '${requiredPermission}' permission.`
  })
}

export { checkPermission }