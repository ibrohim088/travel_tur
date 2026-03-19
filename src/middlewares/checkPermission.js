const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Avval tizimga kiring" });
    }

    if (user.role === "admin") {
      return next();
    }

    if (!user.permissions || !user.permissions[permissionKey]) {
      return res.status(403).json({
        message: `Forbidden: Sizda '${permissionKey}' uchun ruxsat yo'q`,
      });
    }

    next();
  };
};

export default checkPermission;