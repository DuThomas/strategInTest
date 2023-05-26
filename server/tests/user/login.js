import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)

describe('POST /login', () => {
	let session
	const email = 'test123@example.com'
	const password = 'testPassword132'
	const notExistingEmail = "not.existing@email.com"
	const wrongPassword = 'WrongPassword'

	beforeEach(async () => {
		session = await startSession()
		session.startTransaction()

		try {
			const user = new User({ email, password })
			await User.deleteMany() // Clear users
			await user.save() // Add user to db
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

	it('should login and return a token if password matches to email', async () => {
		try {
			const res = await chai.request(app)
				.post('/login')
				.send({ email, password })
	
			expect(res).to.have.status(200)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('jwtToken')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email is not given', async () => {
		try {
			const res = await chai.request(app)
				.post('/login')
				.send({ password })
				
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email does not exist', async () => {
		try {
			const res = await chai.request(app)
				.post('/login')
				.send({
					email: notExistingEmail,
					password
				})
			expect(res).to.have.status(404)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email not found')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if password is not given', async () => {
		try {
			const res = await chai.request(app)
				.post('/login')
				.send({ email })
		
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if password is wrong', async () => {
		try {
			const res = await chai.request(app)
				.post('/login')
				.send({
					email,
					password: wrongPassword
				})
			expect(res).to.have.status(401)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email and password do not match')
		} catch (error) {
			throw new Error(error)
		}
	})
})