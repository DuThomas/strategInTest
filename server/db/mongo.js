import { connect } from 'mongoose'
import dotenv from 'dotenv-flow'
dotenv.config()

const connection = async () => {
  try {
    const conn = await connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    })
    console.log('DB Connection Success')
    return conn
  } catch (error) {
    console.log('DB Connection Error')
    return null
  }
}

export default connection