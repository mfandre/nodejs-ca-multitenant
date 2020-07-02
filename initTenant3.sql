CREATE DATABASE tenant3
GO
USE tenant3
GO
CREATE TABLE [user] (
    id INT PRIMARY KEY IDENTITY (1, 1),
    name VARCHAR(255)  NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)
GO
INSERT INTO [user] (name, email, password) VALUES
    ('TheBoss Tenant3', 'admin', 'admin')