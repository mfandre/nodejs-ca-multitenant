CREATE TABLE public.user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO public.user (name, email, password) VALUES
    ('TheBoss Tenant1', 'admin', 'admin');