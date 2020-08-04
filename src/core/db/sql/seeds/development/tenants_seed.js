exports.seed = async function (knex) {
  await knex.raw('DELETE FROM tenant')

  await knex.raw('ALTER SEQUENCE tenant_id_seq RESTART WITH 1')

  await knex.raw(`
    INSERT INTO tenant (slug, db_client, db_name, db_host, db_username, db_password, db_port) VALUES
    ('tenant1', 'pg', 'tenant1', 'localhost', 'postgres', 'postgres', 5433),
    ('tenant2', 'pg', 'tenant2', 'localhost', 'postgres', 'postgres', 5434);
  `)
};