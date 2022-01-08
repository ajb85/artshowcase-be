import bcrypt from "bcrypt";
import { queryBuilder } from "../";

const defaultQueries = queryBuilder("users", true);

export function find(filter) {
  return defaultQueries
    .find(filter)
    .select("id", "name", "description", "link", "created_at", "updated_at");
}

export function add(data) {
  return defaultQueries
    .add(data)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export function edit(filter, data) {
  return defaultQueries
    .edit(filter, data)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export const { remove } = defaultQueries;
