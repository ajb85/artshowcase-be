export function up(knex) {
  return knex.schema.createTable("progress_images", (tbl) => {
    tbl.increments();
    tbl.text("link").notNullable().unique();
    tbl.integer("order").defaultTo(1);
    tbl
      .bigint("image_id")
      .references("id")
      .inTable("images")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable();
    tbl.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("progress_images");
}
