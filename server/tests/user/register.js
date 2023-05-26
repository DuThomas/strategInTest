import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)

describe('POST /register', () => {
	let session
	const email = 'test123@example.com'
	const password = 'testPassword132'
	const invalidEmail = "invalidEmail"
	const invalidPassord = '123'

	const user = { email, password }

	beforeEach(async () => {
    session = await startSession()
    session.startTransaction()

    try {
      // Clear users
      await User.deleteMany()
    } catch (error) {
      throw new Error(error)
    }
  })

  afterEach(async () => {
    try {
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
    } finally {
      session.endSession()
    }
  })

	it('should register a new user with valid email and password', async () => {
		try {
			const res = await chai.request(app)
				.post('/register')
				.send(user)
	
			expect(res).to.have.status(201)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('newUser')
			expect(res.body.newUser).to.have.property('email').equal(email)
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email is not given', async () => {
		try {
			const res = await chai.request(app)
				.post('/register')
				.send({ password })
	
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email already used', async () => {
		try {
			await new User(user).save() // add an user
			const res = await chai.request(app) // add that user again
				.post('/register')
				.send(user)
	
			expect(res).to.have.status(409)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is already used')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email is not valid', async () => {
		try {
			const res = await chai.request(app)
				.post('/register')
				.send({
					email: invalidEmail,
					password
				})
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if password is not given', async () => {
		try {
			const res = await chai.request(app)
				.post('/register')
				.send({ email })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if password is less than 8 characters', async () => {
		const res = await chai.request(app)
			.post('/register')
			.send({
				email,
				password: invalidPassord
			})
		expect(res).to.have.status(400)
		expect(res.body).to.be.an('object')
		expect(res.body).to.have.property('error', 'Password is required and should be at least 8 characters')
	})
})