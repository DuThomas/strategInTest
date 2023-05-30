import { Router } from "express"
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/project.js"
const router = Router()

router
  .route('/create')
  .post(createProject)

  router
  .route('/update')
  .put(updateProject)

router
  .route('/delete')
  .delete(deleteProject)

router
  .route('/')
  .get(getProjects)
  .post(getProject)

export default router