exports.seed = async function (knex) {
  await knex.raw('DELETE FROM tenant')

  await knex.raw('ALTER SEQUENCE tenant_id_seq RESTART WITH 1')

  await knex.raw(`
    INSERT INTO tenant (slug, db_client, db_name, db_host, db_username, db_password, db_port) VALUES
    ('tenant1', 'pg', 'tenant1_db', 'tenant1', 'postgres', 'postgres', 5432),
    ('tenant2', 'pg', 'tenant2_db', 'tenant2', 'postgres', 'postgres', 5432);
  `)
};