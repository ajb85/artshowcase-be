import bcrypt from "bcrypt";
import { queryBuilder } from "../";

const defaultQueries = queryBuilder("users", true);

export function find(filter) {
  return defaultQueries.find(filter).select("id", "username");
}

export async function verifyUserPassword(user_id, password) {
  const user = await defaultQueries.find({ id: user_id }).select("*").first();
  try {
    return bcrypt.compareSync(password, user.password);
  } catch (err) {
    return false;
  }
}

export function edit(filter, data) {
  return defaultQueries
    .edit(filter, data)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}
