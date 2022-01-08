import dotenv from "dotenv";
import pgString from "pg-connection-string";
dotenv.config();

const pgConfig = process.env.DATABASE_URL
  ? pgString.parse(process.env.DATABASE_URL)
  : {};
pgConfig.ssl = { rejectUnauthorized: false };

export default {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.PG_DB,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations/",
    },
    seeds: {
      directory: "./db/seeds/",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "postgresql",
    connection: pgConfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations/",
    },
    seeds: {
      directory: "./db/seeds/",
    },
    useNullAsDefault: true,
  },
};
