import { testDelete, testLogin, testRegister, testUpdate, testUsers } from './user/index.js'
import testDb from './db.js'

testDb()

describe('API USER', () => {
    testRegister()
    testLogin()
    testUpdate()
    testDelete()
    testUsers()
})