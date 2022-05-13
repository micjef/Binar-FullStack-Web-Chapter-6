module.exports = (args) => {
  const allowedRole = [...args];

  return async (req, res, next) => {
    for (const iterator of allowedRole) {
      if (iterator === req.user.role) {
        next();
        return;
      }
    }
    res.json({
      message: "You have no right",
    });
  };
};
