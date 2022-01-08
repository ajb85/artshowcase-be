import * as Users from "#queries/users";

export async function validatePassword(req, res, next) {
  const { username, password } = req.body;
  const user = await Users.find({ username }).first();
  const correctPassword =
    user && (await Users.verifyUserPassword(user.id, password));

  if (!user || !correctPassword) {
    return res
      .status(400)
      .json({ message: "Username/password incorrect.", context: "login" });
  }

  res.locals.user = user;
  next();
}

export async function validatePasswordChange(req, res, next) {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword || newPassword) {
    const { id } = res.locals.user;
    const matches = await Users.verifyUserPassword(id, oldPassword);

    if (!matches) {
      return res.status(400).json({
        message: "Username/password incorrect.",
        context: "editAccount",
      });
    }
  }

  next();
}
