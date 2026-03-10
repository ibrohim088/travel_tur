const checkPermission = (requiredPermission) => (req, res, next) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" })
  }

  if (user.role === "admin") {
    return next()
  }

  if (user.permissions?.[requiredPermission] === true) {
    return next()
  }

  return res.status(403).json({
    msg: `Access denied. You don't have '${requiredPermission}' permission.`
  })
}

export { checkPermission }