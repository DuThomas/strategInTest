import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)

export default () =>
	describe('GET /users', () => {

		let session
		const email = 'test123@example.com'
		const password = 'testPassword132'

		beforeEach(async () => {
			session = await startSession()
			session.startTransaction()

			try {
				const defaultUser = new User({ email, password })
				await User.deleteMany() // Clear users
				await defaultUser.save() // Add user to db
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
		it('should access to /users and get users list if user has valid jwtToken', async () => {
			try {
				const loginRes = await chai.request(app)
					.post('/login')
					.send({ email, password })

				const jwtToken = loginRes.body.jwtToken;
				const usersRes = await chai.request(app)
					.get('/users')
					.set('Authorization', `Bearer ${jwtToken}`)

				expect(usersRes).to.have.status(200)
				expect(usersRes.body).to.be.an('object')
				expect(usersRes.body).to.have.property('users').that.is.an('array')
			} catch (error) {
				throw new Error(error)
			}
		})

		it('should return an error if the user tries accessing /users with an invalid jwtToken.', async () => {
			try {
				const jwtToken = 'invalidJwtToken'
				const res = await chai.request(app)
					.get('/users')
					.set('Authorization', `Bearer ${jwtToken}`)

				expect(res).to.have.status(401)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('error', 'Invalid token')
			} catch (error) {
				throw new Error(error)
			}
		})

		it('should return an error if the user tries accessing /users without jwtToken.', async () => {
			try {
				const res = await chai.request(app)
					.get('/users')

				expect(res).to.have.status(401)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('error', 'No token')
			} catch (error) {
				throw new Error(error)
			}
		})
	})