const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 51,
            username: 'test-user1', 
            password: 'test-user1', 
            email: 'test-user1@gmail.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 52,
            username: 'test-user2', 
            password: 'test-user2', 
            email: 'test-user2@gmail.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
        {
            id: 53,
            username: 'test-user3', 
            password: 'test-user3', 
            email: 'test-user3@gmail.com',
            date_created: '2029-01-22T16:28:32.615Z',
        },
    ]
}

function makeBabiesArray(users) {
    return [
        {
            id: 51,
            baby_name: 'test-baby1',
            about: 'Im baby edison bulb taxidermy jianbing you probably havent heard of them palo santo, next level vegan sriracha. Lumbersexual craft beer fanny pack chicharrones palo santo woke af hammock single-origin coffee raclette intelligentsia semiotics crucifix raw denim freegan. Yr 3 wolf moon tousled hexagon, trust fund vexillologist umami gastropub taxidermy salvia hot chicken snackwave street art ramps semiotics.',
            image_url: 'http://placehold.it/500x500',
            total_score: 16,
            total_votes: 20,
            user_id: users[0].id
        },
        {
            id: 52,
            baby_name: 'test-baby2',
            about: 'Raw denim ennui edison bulb woke health goth. Austin mustache try-hard gluten-free, flannel squid copper mug. Fashion axe church-key iPhone, selvage slow-carb waistcoat tilde. Celiac blue bottle hell of, before they sold out yr kinfolk knausgaard cornhole helvetica salvia mixtape microdosing hexagon.',
            image_url: 'http://placehold.it/500x500',
            total_score: 15,
            total_votes: 20,
            user_id: users[1].id
        },
        {
            id: 53,
            baby_name: 'test-baby3',
            about: 'Tousled quinoa whatever letterpress kickstarter 90s. Marfa skateboard cornhole tousled twee slow-carb. Forage cold-pressed asymmetrical pop-up bicycle rights small batch synth. Flannel cronut gentrify pickled, tote bag jianbing pabst fashion axe. Lumbersexual franzen forage helvetica pinterest, typewriter squid.',
            image_url: 'http://placehold.it/500x500',
            total_score: 13,
            total_votes: 20,
            user_id: users[2].id
        },
    ]
}

function makeExpectedBaby(users, baby) {
    const user = users
    .find(user => user.id === baby.user_id)

    return {
        id: baby.id,
        image_url: baby.image_url,
        baby_name: baby.baby_name,
        about: baby.about,
        date_created: baby.date_created,
        user: {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            date_created: user.date_created,
        },
    }
}

function makeMaliciousBaby(user) {
    const maliciousBaby = {
        id: 911,
        image: 'http://placehold.it/500x500',
        date_created: new Date().toISOString(),
        baby_name: 'Naughty naughty very naughty <script>alert("xss");</script>',
        user_id: user.id,
        about: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
        }
        const expectedBaby = {
        ...makeExpectedBaby([user], maliciousBaby),
        baby_name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
        about: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
        }
        return {
        maliciousBaby,
        expectedBaby,
        }
}

function makeBabiesFixtures() {
    const testUsers = makeUsersArray()
    const testBabies = makeBabiesArray(testUsers)
    return { testUsers, testBabies }
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
            babies,
            users,
            comments,
            RESTART IDENTITY CASCADE`
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function seedBabiesTables(db, users) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('babies').insert(babies)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('babies_id_seq', ?)`,
            [babies[babies.length - 1].id],
        )
    })
}

function seedMaliciousBaby(db, user, baby) {
    return seedUsers(db, [user])
        .then(() =>
            db
            .into('babies')
            .insert([baby])
        )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.user_name,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}


module.exports = {
    makeUsersArray,
    makeBabiesArray,
    makeExpectedBaby,
    makeMaliciousBaby,
  
    makeBabiesFixtures,
    cleanTables,
    seedBabiesTables,
    seedMaliciousBaby,
    makeAuthHeader,
    seedUsers
}  
  