export function up(knex, Promise) {
  return knex.raw(`
        create sequence global_id_sequence;
        CREATE OR REPLACE FUNCTION id_generator(OUT result bigint) AS $$
        DECLARE
            our_epoch bigint := 1314220021721;
            seq_id bigint;
            now_millis bigint;
            -- the id of this DB shard, must be set for each
            -- schema shard you have - you could pass this as a parameter too
            shard_id int := 1;
        BEGIN
            SELECT nextval('global_id_sequence') % 1024 INTO seq_id;
            SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
            result := (now_millis - our_epoch) << 23;
            result := result | (shard_id << 10);
            result := result | (seq_id);
        END;
        $$ LANGUAGE PLPGSQL;
        select id_generator();
    `);
}

export function down(knex) {
  return knex.raw(
    `DROP FUNCTION IF EXISTS id_generator;
     DROP SEQUENCE IF EXISTS global_id_sequence;`
  );
}
