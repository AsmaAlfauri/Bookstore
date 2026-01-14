exports.hasPermission = (permission) => {
  return (req, res, next) => {
    if (
      req.user.role &&
      req.user.role.permissions.includes(permission)
    ) {
      next();
    } else {
      res.status(403).json({ message: "Permission denied" });
    }
  };
};
