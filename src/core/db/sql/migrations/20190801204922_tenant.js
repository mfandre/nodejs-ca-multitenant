
exports.up = function(knex) {
  return knex.raw(`
    CREATE TABLE tenant (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      db_client VARCHAR(10) NOT NULL,
      db_name VARCHAR(100) UNIQUE NOT NULL,
      db_host VARCHAR(255),
      db_username VARCHAR(100),
      db_password TEXT,
      db_port INTEGER NOT NULL DEFAULT 5432,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `)
};

exports.down = function(knex) {
  return knex.raw(`
    DROP TABLE tenant;
  `)
};
