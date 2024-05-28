import express from 'express'
import { ViewsController } from '../controllers/views.controller.js'

const router = express.Router()
const viewController = new ViewsController()

router.get('/', viewController.allProdsRender)
router.get('/realtimeproducts', viewController.realTimeProds)
router.get('/chat', viewController.chat)
router.get('/products', viewController.getProdsForView)
router.get('/carts/:cid', viewController.cartRender)
router.get('/login', viewController.login)
router.get('/register', viewController.register)
router.get('/profile', viewController.profile)

export default router