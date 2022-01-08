import bcrypt from "bcrypt";
import { queryBuilder } from "../";

const defaultQueries = queryBuilder("images");

export function find(filter) {
  return defaultQueries
    .find(filter)
    .select(
      "id",
      "name",
      "description",
      "link",
      "private",
      "created_at",
      "updated_at"
    );
}

export function add(data) {
  return defaultQueries
    .add(data)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export function edit(filter, data) {
  const { id, ...d } = data;
  // if (filter.id) {
  //   filter.id = BigInt(filter.id);
  // }

  return defaultQueries
    .edit(filter, d)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export const { remove } = defaultQueries;
