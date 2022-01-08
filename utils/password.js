import bcrypt from "bcrypt";

export function encrypt(password) {
  return bcrypt.hashSync(password, 15);
}
