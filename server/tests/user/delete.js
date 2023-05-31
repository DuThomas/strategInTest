import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)

describe('DELETE /', () => {
  let session

  beforeEach(async () => {
    session = await startSession()
    session.startTransaction()

    const email = 'test123@example.com'
    const password = 'testPassword132'
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

  it('should delete the user and return that deleted user if email does exist', async () => {
      try {
        const user = await User.findOne()
        const res = await chai.request(app)
          .delete('/')
          .send({ _id: user._id})

        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('deletedUser')
        expect(res.body).to.have.property('message', 'User deleted successfully')
      } catch (error) {
        throw new Error(error)
      }
  })

  it('should return an error if user does not exist', async () => {
    try {
      const notExistingId = '64770912137bed69568aa5a4'
      const res = await chai.request(app)
        .delete('/')
        .send({ _id: notExistingId })
  
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error', 'User not found')
    } catch (error) {
      throw new Error(error)
    }
  })

  it('should return an error if user ID not given', async () => {
    try {
      const res = await chai.request(app)
        .delete('/')
        .send()
  
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error', 'User ID is required')
    } catch (error) {
      throw new Error(error)
    }
  })
})