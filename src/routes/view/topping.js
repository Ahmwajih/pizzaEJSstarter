"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/topping:

const permissions = require('../../middlewares/permissions')
const topping = require('../../controllers/view/topping')

// URL: /toppings

router.use(permissions.isAdmin)

router.all('/', topping.list)
router.all('/create', topping.create)
router.all('/:id', topping.read)
router.all('/:id/update', topping.update)
router.all('/:id/delete', topping.delete)

/* ------------------------------------------------------- */
module.exports = router