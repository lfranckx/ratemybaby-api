const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Babies Endpoints', function() {
  let db

  const {
    testUsers,
    testBabies,
  } = helpers.makeBabiesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`GET /api/babies`, () => {
    context(`Given no babies`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/babies')
          .expect(200, [])
      })
    })

    context('Given there are babies in the database', () => {
      beforeEach('insert babies', () =>
        helpers.seedBabiesTables(
          db,
          testUsers,
          testBabies,
        )
      )

      it('responds with 200 and all of the babies', () => {
        const expectedBabies = testBabies.map(baby =>
          helpers.makeExpectedBaby(
            testUsers,
            baby,
          )
        )
        return supertest(app)
          .get('/api/babies')
          .expect(200, expectedBabies)
      })
    })

    context(`Given an XSS attack baby`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousBaby,
        expectedBaby,
      } = helpers.makeMaliciousBaby(testUser)

      beforeEach('insert malicious baby', () => {
        return helpers.seedMaliciousBaby(
          db,
          testUser,
          maliciousBaby,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/baby`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedBaby.title)
            expect(res.body[0].content).to.eql(expectedBaby.content)
          })
      })
    })
  })

  describe(`GET /api/babies/:baby_id`, () => {
    context(`Given no babies`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const babyId = 123456
        return supertest(app)
          .get(`/api/babies/${babyId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Baby doesn't exist` })
      })
    })

    context('Given there are babies in the database', () => {
      beforeEach('insert babies', () =>
        helpers.seedBabiesTables(
          db,
          testUsers,
          testBabies,
        )
      )

      it('responds with 200 and the specified baby', () => {
        const babyId = 2
        const expectedBaby = helpers.makeExpectedBaby(
          testUsers,
          testBabies[babieId - 1],
        )

        return supertest(app)
          .get(`/api/babies/${babyId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedBaby)
      })
    })

    context(`Given an XSS attack baby`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousBaby,
        expectedBaby,
      } = helpers.makeMaliciousBaby(testUser)

      beforeEach('insert malicious baby', () => {
        return helpers.seedMaliciousBaby(
          db,
          testUser,
          maliciousBaby,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/api/babies/${maliciousBaby.id}`)
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedBaby.title)
            expect(res.body.content).to.eql(expectedBaby.content)
          })
      })
    })
  })

  describe(`GET /api/babies/:baby_id/reviews`, () => {
    context(`Given no babies`, () => {
      beforeEach(() =>
        helpers.seedUsers(db, testUsers)
      )

      it(`responds with 404`, () => {
        const babyId = 123456
        return supertest(app)
          .get(`/api/babies/${babyId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: `Baby doesn't exist` })
      })
    })

    context('Given there are reviews for baby in the database', () => {
      beforeEach('insert babies', () =>
        helpers.seedBabiesTables(
          db,
          testUsers,
          testBabies,
        )
      )

      it('responds with 200 and the specified reviews', () => {
        const babyId = 1
        const expectedReviews = helpers.makeExpectedBabyReviews(
          testUsers, babyId
        )

        return supertest(app)
          .get(`/api/babies/${babyId}/reviews`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, expectedReviews)
      })
    })
  })
})
