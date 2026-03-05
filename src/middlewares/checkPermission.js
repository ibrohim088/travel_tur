const checkPermission = (requirePermission) => (req, res) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  if (user.role === 'admin' && user.permissions.watchAllUsers === true) {
    return next();
  }

  if (user.permissions && user.permissions[requiredPermission] === true) {
    return next();
  }

  return res.status(403).json({
    msg: `Access denied. You don't have '${requiredPermission}' permission.`
  });
}