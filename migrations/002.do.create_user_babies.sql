CREATE TABLE user_babies (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    baby_name TEXT NOT NULL,
    about TEXT NOT NULL,
    image_url TEXT UNIQUE,
    total_score NUMERIC,
    total_votes NUMERIC,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE
)