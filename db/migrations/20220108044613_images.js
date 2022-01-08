export function up(knex) {
  return knex.schema.createTable("images", (tbl) => {
    tbl.bigint("id").primary().defaultsTo(knex.raw("id_generator()"));
    tbl.text("name");
    tbl.text("description");
    tbl.bool("private").defaultTo(true);
    tbl.text("link").notNullable().unique();
    tbl.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("images");
}
