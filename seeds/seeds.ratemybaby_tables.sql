BEGIN;

TRUNCATE
    users,
    user_babies
    RESTART IDENTITY CASCADE;

INSERT INTO users (username, user_password, email)
VALUES
    ('user1', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user1@gmail.com'),
    ('user2', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user2@gmail.com'),
    ('user3', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user3@gmail.com'),
    ('user4', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user4@gmail.com'),
    ('user5', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user5@gmail.com'),
    ('user6', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user6@gmail.com'),
    ('user7', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user7@gmail.com'),
    ('user8', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user8@gmail.com'),
    ('user9', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user9@gmail.com'),
    ('user10', '$2a$10$yivuED9JkAt3vWs4NYmIbuCZPq86Oylh8NaiX4FqLoFXVfq9kBENe', 'user10@gmail.com');

INSERT INTO user_babies (baby_name, age, age_format, country, about, image_url, total_score, total_votes, parent_id)
VALUES
    (
        'Noah', 
        8,
        'months',
        'Indonesia',
        'I, myself, am strange and unusual.',        
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Noah.jpg',
        16,
        20,
        1
    ),
    (
        'Emma', 
        1,
        'year',
        'UK',
        'Half crazy, half sane.
        A bit of a gypsy.
        Against reality.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Emma.jpg',
        15,
        20,
        2
    ),
    (
        'Frank', 
        3,
        'months',
        'United States',
        'Do not look at me.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Frank.jpg',
        10,
        20,
        3
    ),
    (
        'James', 
        5,
        'months',
        'United States',
        'Match my hustle. Iron sharpens Iron.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/CJ.jpg',
        16,
        20,
        4
    ),
    (
        'Kylie',
        1,
        'year',
        'United States',
        'Chill, music lover, positive, inspiring, kind.✨',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Kylie.jpg',
        9,
        20,
        5
    ),
    (
        'Stephen',
        3, 
        'months',
        'China',
        'Fun facts 🎉
        🌮 Food lover
        😄 I smile sometimes',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Stephen.jpg',
        8,
        20,
        6
    ),
    (
        'Lauren', 
        4,
        'months',
        'United States',
        'Damn I’m tired 😴',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Lauren.jpg',
        17,
        20,
        7
    ),
    (
        'Dan',
        6,
        'months',
        'United States', 
        'I like to Netflix before chill.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Dan.jpg',
        5,
        20,
        8
    ),
    (
        'John',
        11, 
        'months',
        'United States',
        'Small awkward creature who can often be found dancing.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/John.jpg',
        10,
        20,
        9
    ),
    (
        'Danielle', 
        8,
        'months',
        'United States',
        'I love pugs, bugs, and Disney. I am a Disney princess 👸🏻 but basically Satan.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Danielle.jpg',
        7,
        20,
        10
    );

COMMIT;