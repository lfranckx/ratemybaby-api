CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    baby_id INTEGER
        REFERENCES user_babies(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES users(id) ON DELETE CASCADE NOT NULL
);