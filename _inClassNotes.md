PIZZA with TEMPLATE

```sh
    $ cp .env-sample .env
    $ mkdir logs
    $ npm i
    $ npm i ejs
```

* EJS Settings:
    * index.js
        ```js
        app.set('views', './public')
        app.set('view engine', 'ejs')
        app.set('view options', {
            openDelimiter: '{', closeDelimiter: '}',
        })
        // Accept form data & convert to object:
        app.use(express.urlencoded({ extended: true }))
        // StaticFiles:
        app.use('/assets', express.static('./public/assets'))
        ```
    * Routes
        * api
        * view
            ```js
            router.all('/', ...)
            router.all('/create', ...)
            router.all('/:id', ...)
            router.all('/:id/update', ...)
            router.all('/:id/delete', ...)
            ```
    * Controllers
        * api
        * view
            ```js
            res.render('ejsFile', { ... })
            ```
* Template
    * Pizza List
        * pagination
    * public/partials
        * header
            * res.locals -> authentication
        * footer
        * pagination
    * User
        * Login
        * Register
        * Logout
        * userControl (admin-area)
    * Order
        * List
            * view self records
        * Update (checkUser)
        * Delete (checkAdmin)
        * Create  (checkUser)
            * userId from session

---
Finished :)