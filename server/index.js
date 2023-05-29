import connection from './db/mongo.js'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.js'
import taskRoutes from './routes/task.js'
import projectRoutes from './routes/project.js'

connection() // Connnect to DB

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/', userRoutes)
app.use('/task', taskRoutes)
app.use('/project', projectRoutes)

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