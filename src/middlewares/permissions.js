'use strict';
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Middleware: permissions

module.exports = {
  isLogin: (req, res, next) => {
    // return next()

    if (req.isLogin || res?.locals?.user) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error('NoPermission: You must login.');
    }
  },

  isAdmin: (req, res, next) => {
    // return next()

    if ((req.isLogin && req.user.isAdmin) || res?.locals?.user?.isAdmin) {
      next();
    } else {
      res.errorStatusCode = 403;
      throw new Error('NoPermission: You must login and to be Admin.');
    }
  },
};
