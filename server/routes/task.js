import { Router } from "express"
import { createTask, deleteTask, getProjectTasks, getTasks, updateTask } from "../controllers/task.js"
const router = Router()

router
  .route('/create')
  .post(createTask)
router
  .route('/update')
  .put(updateTask)

router
  .route('/delete')
  .delete(deleteTask)

router
  .route('/tasks')
  .get(getTasks)

router
  .route('/projectTasks')
  .post(getProjectTasks)

export default router