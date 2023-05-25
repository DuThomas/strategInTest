import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import mongoose from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)
chai.should()

describe('POST /register', () => {
	const user = {
    email: 'test@example.com',
    password: 'myPassword'
  }
  const {email, password} = user

	beforeEach((done) => {
		// Clear db
		mongoose.connection.collections.users.drop(() => {
				done()
		})
	})

	afterEach((done) => {
		done()
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

	it('should return an error if email is not given', (done) => {
		chai.request(app)
			.post('/register')
			.send({ password })
			.end((error, res) => {
				expect(res).to.have.status(400)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('error', 'Email is required and must be valid')
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
				expect(res.body).to.have.property('error', 'Email is required and must be valid')
				done()
			})
	})

	it('should return an error if password is not given', (done) => {
		chai.request(app)
			.post('/register')
			.send({ email })
			.end((error, res) => {
				expect(res).to.have.status(400)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('error', 'Password is required and should be at least 8 characters')
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
				expect(res.body).to.have.property('error', 'Password is required and should be at least 8 characters')
				done()
			})
	})
})