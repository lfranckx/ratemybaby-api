CREATE TABLE user_babies (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    baby_name TEXT NOT NULL,
    age NUMERIC NOT NULL,
    age_format TEXT NOT NULL,
    country TEXT NOT NULL,
    about TEXT NOT NULL,
    image_url TEXT,
    total_score NUMERIC,
    total_votes NUMERIC,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP
);
