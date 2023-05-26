import chai, { use } from 'chai'
import chaiHttp from 'chai-http'
import app from '../../index.js'
import User from '../../models/user.js'
import { startSession } from 'mongoose'
import { afterEach } from 'mocha'

const { expect } = chai

chai.use(chaiHttp)
chai.should()

describe('POST /delete', () => {
  let session

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

  it('should delete the user and return that deleted user if email does exist', async () => {
      try {
        const email = 'test123@example.com'
        const res = await chai.request(app)
          .post('/delete')
          .send({ email })

        expect(res).to.have.status(200)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('deletedUser')
        expect(res.body).to.have.property('message', 'User deleted successfully')
      } catch (error) {
        throw new Error(error)
      }
  })

  it('should return an error if email does not exist', async () => {
    try {
      const email = "not.existing@email.com"
      const res = await chai.request(app)
        .post('/delete')
        .send({ email })
  
      expect(res).to.have.status(404)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error', 'Email not found')
    } catch (error) {
      throw new Error(error)
    }
  })

  it('should return an error if email not given', async () => {
    try {
      const res = await chai.request(app)
        .post('/delete')
        .send()
  
      expect(res).to.have.status(400)
      expect(res.body).to.be.an('object')
      expect(res.body).to.have.property('error', 'Email is required')
    } catch (error) {
      throw new Error(error)
    }
  })
})