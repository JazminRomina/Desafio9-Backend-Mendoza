import productsModel from '../models/products.model.js'
import { ProductService } from '../services/products.service.js'
import { CartsService } from '../services/carts.service.js'

const prodService = new ProductService()
const cartService = new CartsService()

export class ViewsController{
    allProdsRender = async(req, res) => {
    const allProds = await prodService.getAllProdsViews(req)
    res.render("home", {
        prods: allProds.response.payload,
        hasPrevPage: allProds.response.hasPrevPage,
        hasNextPage: allProds.response.hasNextPage,
        prevPage: allProds.response.prevPage,
        nextPage: allProds.response.nextPage,
        currentPage: allProds.response.page,
        totalPages: allProds.response.totalPages
    })
    }

    realTimeProds = async(req, res) => {
        const allProds = await productsModel.find().lean()
        res.render("realTimeProducts", {prods: allProds})
    }

    chat = async (req, res) => {
        res.render("chat")
    }

    getProdsForView = async (req, res) => {
        const allProds = await prodService.getAllProdsViews(req)
        res.render("products", {
            prods: allProds.response.payload,
            hasPrevPage: allProds.response.hasPrevPage,
            hasNextPage: allProds.response.hasNextPage,
            prevPage: allProds.response.prevPage,
            nextPage: allProds.response.nextPage,
            currentPage: allProds.response.page,
            totalPages: allProds.response.totalPages,
            user: req.session.user,
            session: req.session.login
        })
    }

    cartRender = async (req, res) => {
        try{
            const cid = req.params.cid
            const cartProdsInIt = await cartService.getCartById(cid)
            res.render("carts", {
                productsCart: cartProdsInIt.products,
                cartId: cartProdsInIt._id
            })
        }
        catch(error){
            res.status(500).json('We could not find the cart')
        }
    }

    login = (req, res) => {
        res.render("login")
    }

    register = (req, res) => {
        res.render("register")
    }

    profile = async(req, res) => {
        if(!req.session.login){
            return res.redirect("/login")
        }
        res.render("profile", {user: req.session.user})
    }
}