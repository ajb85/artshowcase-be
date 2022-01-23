import bcrypt from "bcrypt";
import { queryBuilder } from "../";

const defaultQueries = queryBuilder("customizations");

export function find(filter) {
  return defaultQueries.find(filter).select("colors", "text");
}

export function add(data) {
  return defaultQueries
    .add(data)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export function edit(filter, data) {
  const { id, ...d } = data;

  return defaultQueries
    .edit(filter, d)
    .then(([{ id }]) => defaultQueries.find({ id }).first());
}

export const { remove } = defaultQueries;
