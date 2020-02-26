CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    username TEXT NOT NULL UNIQUE,
    user_password TEXT NOT NULL,
    email TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL
);