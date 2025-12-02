import express from 'express'
import { create, getAll, update, destroy, getOne } from './../controllers/userController.js'
import auth  from './../middlewares/auth.js'

const router = express.Router()

router.get('/', auth, getAll)
router.get('/:id', auth, getOne)
router.post('/', auth, create)
router.put('/:id', auth, update)
router.delete('/:id', auth, destroy)

export default router
