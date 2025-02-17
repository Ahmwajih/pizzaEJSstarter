'use strict';
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // const accessToken = req.headers?.authorization.replaceAll('Bearer ')
  const auth = req.headers?.authorization; // Bearer ...token...
  const accessToken = auth ? auth.split(' ')[1] : null; // ['Bearer', '...token...']

  req.isLogin = false;
  req.user = null;

  jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, userData) {
    if (userData && userData.isActive) {
      console.log('user is active')
      req.isLogin = true;
      req.user = userData;
    }
  });

  // FOR TEMPLATES: Check user from session and set to locals:
  // Global variables for templates:
  res.locals.user = req.session?.user || req.user;
  console.log('locals...', res.locals);
  console.log('user.... ', res.locals.user);
  next();
};
