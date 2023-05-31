import { Router } from "express"
import { createProject, deleteProject, getProject, getProjects, updateProject } from "../controllers/project.js"
const router = Router()

router
  .route('/')
  .post(createProject)
  .put(updateProject)
  .delete(deleteProject)

router
  .route('/fetch')
  .get(getProjects)
  .post(getProject)

export default router