"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- *
    $ cp .env-sample .env
    $ mkdir logs
    $ npm i
    $ npm i ejs cookie-session
/*------------------------------------------------------- */

const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// SessionCookies:
const session = require("cookie-session");
app.use(session({ secret: process.env.SECRET_KEY }));
/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// TEMPLATE:
// todo: Template Engine:
const ejs = require('ejs')
ejs.openDelimiter = '{'
ejs.closeDelimiter = '}'
// set the directory where the templates/views will be:
app.set('views', './public')
app.set('view options', {
  openDelimiter: '{',
  closeDelimiter: '}'
})
// Specify the view engine to be used:
app.set('view engine', 'ejs')
// once I do this, I can use res.render() to render a view/template file.
// we simply pass data to our views/templates as an object in the second argument of res.render().
// These templates are then able to access the data passed as a variable.

// THIS IS VERY SIMILAR TO COMPONENTS IN REACT!!!


// Accept form data & convert to object:
app.use(express.urlencoded({ extended: true }));

// StaticFiles:
app.use("/assets", express.static("./public/assets"));

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// accessToken Control:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes: TEMPLATE + SESSION:

// send people to pizzas when they visit the home page!
app.all('/', (req, res)=>{
  res.redirect('/pizzas')
})
// auth:
app.use('/auth', require('./src/routes/view/auth'))
// user:
app.use('/users', require('./src/routes/view/user'))
// order:
app.use('/orders', require('./src/routes/view/order'))
// pizza:
app.use('/pizzas', require('./src/routes/view/pizza'))
// topping:
app.use('/toppings', require('./src/routes/view/topping'))

/* ------------------------------------------------------- */
// Routes: API + JWT:

// HomePath:
app.all("/api", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    isLogin: req.isLogin,
    user: req.user,
  });
});
// auth:
app.use("/api/auth", require("./src/routes/api/auth"));
// user:
app.use("/api/users", require("./src/routes/api/user"));
// order:
app.use("/api/orders", require("./src/routes/api/order"));
// pizza:
app.use("/api/pizzas", require("./src/routes/api/pizza"));
// topping:
app.use("/api/toppings", require("./src/routes/api/topping"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
