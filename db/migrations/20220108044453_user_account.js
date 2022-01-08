export function up(knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.text("username").notNullable();
    tbl.text("password").notNullable();
    tbl.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("users");
}
