CREATE TABLE public.tenant (
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

INSERT INTO public.tenant (slug, db_client, db_name, db_host, db_username, db_password, db_port) VALUES
    ('tenant1', 'pg', 'tenant1', 'localhost', 'postgres', 'postgres', 5433),
    ('tenant2', 'pg', 'tenant2', 'localhost', 'postgres', 'postgres', 5434),
    ('tenant3', 'mssql', 'tenant3', 'localhost', 'sa', 'saPower_123', 1433);
