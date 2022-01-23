export function up(knex) {
  return knex.schema.createTable("customizations", (tbl) => {
    tbl.increments();
    tbl.json("colors");
    tbl.json("text");
    tbl.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("customizations");
}
