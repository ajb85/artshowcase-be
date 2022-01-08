import { encrypt } from "../../utils/password";

export function seed(knex) {
  return knex("users").insert([
    {
      username: process.env.SUPER_ADMIN_USERNAME,
      password: encrypt(process.env.SUPER_ADMIN_PASSWORD),
    },
  ]);
}
