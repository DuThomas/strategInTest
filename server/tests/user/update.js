import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)
chai.should()

describe('POST /update', () => {
	let session

	beforeEach(async () => {
    session = await startSession()
    session.startTransaction()

    const email = 'test123@example.com'
    const password = 'testPassword132'
    const user = new User({ email, password })
    try {
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

	it('should update user\'s data and return that updated user if new data is correct', async () => {
		try {
			const email = 'test123@example.com'
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
	
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail, newPassword })

			expect(res).to.have.status(200)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('message', 'User\'s data updated successfully')
			expect(res.body).to.have.property('updatedUser')

			const user = await User.findOne({email: newEmail})
			const { encryptedPassword } = res.body.updatedUser
			expect(user).to.deep.include({ email: newEmail })
			expect(user.encryptedPassword).to.equal(encryptedPassword)
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email is not given', async () => {
		try {
			const newEmail = 'test123@example.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.post('/update')
				.send({ newEmail, newPassword })
				
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email is not valid', async () => {
		try {
			const email = 'invalidEmail'
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail, newPassword })
				
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'Email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if email does not exist', async () => {
		try {
			const email = "not.existing@email.com"
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail, newPassword })
				
					expect(res).to.have.status(404)
					expect(res.body).to.be.an('object')
					expect(res.body).to.have.property('error', 'Email not found')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is not given', async () => {
		try {
			const email = 'test123@example.com'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newPassword })
				
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is not valid', async () => {
		try {
			const email = 'test123@example.com'
			const newEmail = 'invalidEmail'
			const newPassword = 'newPassword'
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail, newPassword })
				
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New email is required and must be valid')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new email is already used', async () => {
		try {
			const email = 'test123@example.com'
			const newEmail = 'new@email.com'
			const newPassword = 'newPassword'
	
			const user = new User({ email: newEmail, password: newPassword })
			await user.save()
			const res = await chai.request(app)
					.post('/update')
					.send({ email, newEmail, newPassword })
					
				expect(res).to.have.status(400)
				expect(res.body).to.be.an('object')
				expect(res.body).to.have.property('error', 'New email is already used')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new password is not given', async () => {
		try {
			const email = 'test123@example.com'
			const newEmail = 'new@email.com'
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail })
		
			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error', 'New password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})

	it('should return an error if new password is not valid', async () => {
		try {
			const email = 'test123@example.com'
			const newEmail = 'new@email.com'
			const newPassword = '123'
	
			const res = await chai.request(app)
				.post('/update')
				.send({ email, newEmail, newPassword })

			expect(res).to.have.status(400)
			expect(res.body).to.be.an('object')
			expect(res.body).to.have.property('error','New password is required and should be at least 8 characters')
		} catch (error) {
			throw new Error(error)
		}
	})
})