import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index.js'
import User from '../models/user.js'
import mongoose from 'mongoose'

const { expect } = chai

chai.use(chaiHttp)
chai.should()

describe('User API', () => {
  const user = {
    email: 'test@example.com',
    password: 'myPassword'
  }
  const {email, password} = user

  describe('POST /register', () => {
    beforeEach((done) => {
      // Clear db
      mongoose.connection.collections.users.drop(() => {
          done()
      })
    })
    it('should register a new user with valid email and password', (done) => {
      chai.request(app)
        .post('/register')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('newUser')
          expect(res.body.newUser).to.have.property('email').equal(email)
          done()
        })
    })

    it('should return an error if email already used', (done) => {
      chai.request(app) // add an user
        .post('/register')
        .send(user)
        .then(() => {
          chai.request(app) // add the same user
            .post('/register')
            .send(user)
            .end((error, res) => {
              expect(res).to.have.status(409)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('error', 'Email is already used')
              done()
            })
        })
    })

    it('should return an error if email is not valid', (done) => {
      const email = 'invalidEmail'
      chai.request(app)
        .post('/register')
        .send({email, password})
        .end((error, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'Email must be valid')
          done()
        })
    })

    it('should return an error if password is less than 8 characters', (done) => {
      const password = '1234567'
      chai.request(app)
        .post('/register')
        .send({email, password})
        .end((error, res) => {
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'Password should be at least 8 characters')
          done()
        })
    })
  })


  describe('POST /login', () => {
    const email = 'test123@example.com'
    const password = 'testPassword132'
    const user = new User({email, password})

    before((done) => {
      // Clear db
      mongoose.connection.collections.users.drop()

      // Add user to db
      user.save()
        .then(() => {
          done()
        })
    })

    it('should return an error if email does not exist', (done) => {
      const email = "not.existing@email.com"
      chai.request(app)
        .post('/login')
        .send({email, password})
        .end((err, res) => {
          expect(res).to.have.status(404)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'Email not found')
          done()
        })
    })

    it('should return an error if password is wrong', (done) => {
      const password = "WrongPassword"
      chai.request(app)
        .post('/login')
        .send({email, password})
        .end((err, res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'Email and password do not match')
          done()
        })
    })

    it('should login and return a token if password matches to email', (done) => {
      chai.request(app)
        .post('/login')
        .send({ email, password })
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('jwtToken')
          done()
        })
        .catch((error) => done(error))
    })
  })

  describe('GET /users', () => {
    const email = 'test123@example.com'
    const password = 'testPassword132'
    const user = new User({email, password})
    before((done) => {
      // Clear db
      mongoose.connection.collections.users.drop()

      // Add user to db
      user.save()
        .then(() => {
          done()
        })
    })

    it('should access to /users and get users list if user have valid jwtToken', (done) => {
      chai.request(app)
        .post('/login')
        .send({email, password})
        .then((res) => {
          // get a jwtToken after logging in
          const jwtToken = res.body.jwtToken
          chai.request(app)
            .get('/users')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then((res) => {
              expect(res).to.have.status(200)
              expect(res.body).to.be.an('object')
              expect(res.body).to.have.property('emails').that.is.an('array')
              done()
            })
            .catch((error) => done(error))
        })
        .catch((error) => done(error))
    })

    it('should return an error if the user tries accessing /users with an invalid jwtToken.', (done) => {
      const jwtToken = 'invalidJwtToken'
      chai.request(app)
        .get('/users')
        .set('Authorization', `Bearer ${jwtToken}`)
        .then((res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'Invalid token')
          done()
        })
        .catch((error) => done(error))
    })

    it('should return an error if the user tries accessing /users without jwtToken.', (done) => {
      chai.request(app)
        .get('/users')
        .then((res) => {
          expect(res).to.have.status(401)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('error', 'No token')
          done()
        })
        .catch((error) => done(error))
    })
  })

  describe('GET /login', () => {
    it('should access to /login', (done) => {
      chai.request(app)
        .get('/login')
        .end((req, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
  
  describe('GET /register', () => {
    it('should access to /register', (done) => {
      chai.request(app)
        .get('/register')
        .end((req, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })
})
