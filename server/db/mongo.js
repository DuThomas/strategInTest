import { connect } from 'mongoose'
import dotenv from 'dotenv-flow'
dotenv.config()

const connection = () => {
  return connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    }).then((conn) => {
      console.log('DB Connection Success')
      return conn
    }).catch((error) => {
      console.log('DB Connection Error')
      return null
    })
}

export default connection