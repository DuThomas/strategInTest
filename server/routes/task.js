import { Router } from "express"
import { createTask, deleteTask, getProjectTasks, getTasks, updateTask } from "../controllers/task.js"
const router = Router()

router
  .route('/')
  .post(createTask)
  .put(updateTask)
  .delete(deleteTask)

router
  .route('/fetch')
  .get(getTasks)
  .post(getProjectTasks)

export default router