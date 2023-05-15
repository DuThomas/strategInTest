import connection from '../db/mongo.js'
// const mongoose = require('mongoose')
import { expect } from 'chai'

describe('Database Connection', () => {
  it('should connect to the database', async () => {
    const conn = await connection()
    expect(conn).to.exist;
    expect(conn).to.not.be.null;
    // expect(mongoose.connection.readyState).to.equal(1);
  })

  it('should return null if connection fails', async () => {
    // Replace MONGO_URL with an invalid URL to simulate a connection error
    process.env.MONGO_URL = 'invalid_url'
    const conn = await connection()
    expect(conn).to.be.null
  })
})