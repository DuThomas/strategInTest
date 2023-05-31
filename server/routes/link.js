import { Router } from "express"
import { createLink, deleteLink, getProjectLinks, updateLink } from "../controllers/link.js"
const router = Router()

router
    .route('/')
    .post(createLink)
    .put(updateLink)
    .delete(deleteLink)

router
    .route('/fetch')
    .post(getProjectLinks)

export default router