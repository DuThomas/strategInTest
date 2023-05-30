import { Router } from "express"
import { createTask, deleteTask, getProjectTasks, getTasks, updateTask } from "../controllers/task.js"
import { createLink, deleteLink, getProjectLinks, updateLink } from "../controllers/link.js"
const router = Router()

router
  .route('/create')
  .post(createLink)

router
.route('/update')
.put(updateLink)

router
  .route('/delete')
  .delete(deleteLink)

router
.route('/projectLinks')
.post(getProjectLinks)

export default router