import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)

describe('put /update', () => {
	let session
	const email = 'test123@example.com'
	const password = 'testPassword132'

	beforeEach(async () => {
		session = await startSession()
		session.startTransaction()
		const defaultUser = new User({ email, password })
		try {
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

	it('should update user\'s data and return that updated user if new data is correct', async () => {
		try {
			const defaultUser = await User.findOne()
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'

			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newEmail, newPassword })

			expect(res).to.have.status(200)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('message', 'User\'s data updated successfully')
			expect(res.body).to.have.property('updatedUser')

			const user = await User.findOne({ email: newEmail })
			const { encryptedPassword } = res.body.updatedUser
			expect(user).to.deep.include({ email: newEmail })
			expect(user.encryptedPassword).to.equal(encryptedPassword)
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if _id is not given', async () => {
		try {
			const newEmail = 'test123@example.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.put('/update')
				.send({ newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'User ID is required')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if _id is not valid', async () => {
		try {
			const _id = 'invaliId'
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.put('/update')
				.send({ _id, newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if _id does not exist', async () => {
		try {
			const notExistingId = '6475f80bb51d2ee169714f34'
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.put('/update')
				.send({ _id: notExistingId, newEmail, newPassword })
			expect(res).to.have.status(404)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'User not found')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is not given', async () => {
		try {
			const defaultUser = await User.findOne()
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is not valid', async () => {
		try {
			const defaultUser = await User.findOne()
			const newEmail = 'invalidEmail'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is already used', async () => {
		try {
			const defaultUser = await User.findOne()
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'

			const user = new User({ email: newEmail, password: newPassword })
			await user.save()
			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New email is already used')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new password is not given', async () => {
		try {
			const defaultUser = await User.findOne()
			const newEmail = 'new@email.com'
			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newEmail })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new password is not valid', async () => {
		try {
			const defaultUser = await User.findOne()
			const newEmail = 'new@email.com'
			const newPassword = '123'

			const res = await chai.request(app)
				.put('/update')
				.send({ _id: defaultUser._id, newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})
})