CREATE TABLE user_babies (
    baby_id INTEGER,
    baby_name TEXT NOT NULL,
    age TEXT NOT NULL,
    country TEXT NOT NULL,
    about TEXT NOT NULL,
    image_url TEXT,
    total_score NUMERIC,
    total_votes NUMERIC,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    date_modified TIMESTAMP
);
