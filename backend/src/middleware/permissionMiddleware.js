// تحقق إذا المستخدم عنده صلاحية معينة
exports.hasPermission = (permission) => (req, res, next) => {
  if (
    req.user &&
    req.user.role &&
    req.user.role.permissions &&
    req.user.role.permissions.includes(permission)
  ) {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied, insufficient permissions");
  }
};
