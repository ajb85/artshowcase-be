import { decodeToken } from "#utils/token";

export async function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  try {
    const { user } = await decodeToken(token);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token", context: "token" });
    }

    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message:
        "Something is wrong with your token, ensure you provided it and try again.",
      context: "general/token",
    });
  }
}
