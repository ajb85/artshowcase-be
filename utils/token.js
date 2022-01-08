import jwt from "jsonwebtoken";
import * as Users from "#queries/users";

export function generateToken(user) {
  const payload = {
    id: user.id,
  };

  const options = { expiresIn: "1y" };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export async function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.find({ id: decoded.id }).first();

    if (!user) {
      throw "invalid user";
    }

    return { decoded, user };
  } catch (err) {
    console.log("Token error: ", err);
    return { decoded: false, user: false };
  }
}
