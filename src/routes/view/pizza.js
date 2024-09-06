"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/pizza:

const permissions = require('../../middlewares/permissions')
const pizza = require('../../controllers/view/pizza')

// URL: /pizzas

router.all('/', pizza.list)
router.all('/create', permissions.isAdmin, pizza.create)
router.all('/:id', pizza.read)
router.all('/:id/update', permissions.isAdmin, pizza.update)
router.all('/:id/delete', permissions.isAdmin, pizza.delete)

router.put('/:id/pushToppings', permissions.isAdmin, pizza.pushToppings)
router.put('/:id/pullToppings', permissions.isAdmin, pizza.pullToppings)

/* ------------------------------------------------------- */
module.exports = router