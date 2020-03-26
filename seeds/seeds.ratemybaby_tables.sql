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

INSERT INTO user_babies (baby_name, about, image_url, total_score, total_votes, parent_id)
VALUES
    (
        'Noah', 
        'Im baby edison bulb taxidermy jianbing you probably havent heard of them palo santo, next level vegan sriracha. Lumbersexual craft beer fanny pack chicharrones palo santo woke af hammock single-origin coffee raclette intelligentsia semiotics crucifix raw denim freegan. Yr 3 wolf moon tousled hexagon, trust fund vexillologist umami gastropub taxidermy salvia hot chicken snackwave street art ramps semiotics.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Noah.jpg',
        16,
        20,
        1
    ),
    (
        'Emma', 
        'Tousled quinoa whatever letterpress kickstarter 90s. Marfa skateboard cornhole tousled twee slow-carb. Forage cold-pressed asymmetrical pop-up bicycle rights small batch synth. Flannel cronut gentrify pickled, tote bag jianbing pabst fashion axe. Lumbersexual franzen forage helvetica pinterest, typewriter squid.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Emma.jpg',
        15,
        20,
        2
    ),
    (
        'Frank', 
        'Raw denim ennui edison bulb woke health goth. Austin mustache try-hard gluten-free, flannel squid copper mug. Fashion axe church-key iPhone, selvage slow-carb waistcoat tilde. Celiac blue bottle hell of, before they sold out yr kinfolk knausgaard cornhole helvetica salvia mixtape microdosing hexagon.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Frank.jpg',
        10,
        20,
        3
    ),
    (
        'CJ', 
        'Migas crucifix adaptogen whatever live-edge tumeric godard iPhone typewriter coloring book raclette banh mi aesthetic vexillologist. Intelligentsia pug slow-carb, viral plaid butcher 3 wolf moon hammock kombucha irony. Cardigan gastropub four loko before they sold out, hexagon austin pop-up venmo forage chartreuse bicycle rights tumblr taxidermy green juice biodiesel.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/CJ.jpg',
        16,
        20,
        4
    ),
    (
        'Kylie', 
        'Listicle roof party quinoa, brunch meditation waistcoat iceland poke post-ironic taiyaki. YOLO flexitarian hashtag mustache edison bulb, la croix whatever. Actually stumptown drinking vinegar, occupy leggings af cloud bread salvia cray hoodie jean shorts distillery williamsburg single-origin coffee try-hard. Stumptown sustainable skateboard la croix tofu ugh pug yuccie church-key knausgaard gastropub.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Kylie.jpg',
        9,
        20,
        5
    ),
    (
        'Stephen', 
        'Tumblr franzen schlitz quinoa coloring book unicorn blue bottle hell of godard mustache kitsch fingerstache seitan edison bulb. Glossier iPhone leggings, flexitarian organic butcher polaroid cliche. Schlitz try-hard viral keytar intelligentsia unicorn.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Stephen.jpg',
        8,
        20,
        6
    ),
    (
        'Lauren', 
        'Marfa banh mi health goth, unicorn palo santo tattooed typewriter jean shorts hexagon taiyaki raw denim tousled master cleanse af crucifix. 3 wolf moon vice sartorial quinoa. Letterpress literally messenger bag banjo cold-pressed. Normcore ugh kogi vape irony, lyft raw denim thundercats neutra coloring book twee. Tbh tote bag irony cliche biodiesel beard semiotics banjo.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Lauren.jpg',
        17,
        20,
        7
    ),
    (
        'Dan', 
        'Gluten-free biodiesel mustache coloring book kinfolk wayfarers, helvetica gochujang put a bird on it jean shorts tumeric marfa photo booth squid. Ennui bicycle rights irony echo park scenester YOLO drinking vinegar street art shoreditch.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Dan.jpg',
        5,
        20,
        8
    ),
    (
        'John', 
        'I''m baby pBR&B kickstarter put a bird on it af 3 wolf moon viral la croix keffiyeh meggings dreamcatcher hoodie microdosing you probably haven''t heard of them. Humblebrag pitchfork stumptown coloring book butcher air plant. Snackwave occupy flexitarian, biodiesel beard subway tile blog gluten-free synth knausgaard schlitz VHS.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/John.jpg',
        10,
        20,
        9
    ),
    (
        'Danielle', 
        'Selfies keytar leggings, fashion axe chia pitchfork mixtape. Hashtag DIY hoodie, woke vape distillery XOXO organic. Green juice stumptown skateboard fam, air plant wolf vinyl twee meditation intelligentsia. Chartreuse coloring book vexillologist, listicle photo booth kinfolk art party chambray lyft hoodie.',
        'https://ratemybaby-images.s3-us-west-1.amazonaws.com/Danielle.jpg',
        7,
        20,
        10
    );

COMMIT;

-- original password: User1234!;