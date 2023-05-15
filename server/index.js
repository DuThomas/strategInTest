import connection from './db/mongo.js'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.js'

// Connnect to DB
connection()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors())

app.use('/', userRoutes)

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  })
})


app.set('port', process.env.PORT)

app.listen(
  app.get('port'), 
  () => console.log(`server listening on ${app.get('port')}`)
)

export default app