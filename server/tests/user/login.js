import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)
chai.should()

describe('POST /login', () => {
	let session

	const email = 'test123@example.com'
	const password = 'testPassword132'
	const user = new User({ email, password })

	beforeEach(async () => {
		session = await startSession()
		session.startTransaction()

		const email = 'test123@example.com'
		const password = 'testPassword132'
		const user = new User({ email, password })
		try {
			// Clear users
			await User.deleteMany()
			// Add user to db
			await user.save()
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

	it('should return an error if email does not exist', (done) => {
		const email = "not.existing@email.com"
		chai.request(app)
			.post('/login')
			.send({ email, password })
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
			.send({ email, password })
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