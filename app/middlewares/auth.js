const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');

const User = db.user;
const Role = db.role;

exports.verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).json({
      message: 'No token provided',
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }

    req.userId = decoded.id;

    next();
  });
};

exports.isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        roles.map(role => {
          if (role.name === 'admin') {
            next();
            return;
          }
        });

        // for (let i = 0; i < roles.length; i++) {
        //   if (roles[i].name === 'admin') {
        //     next();
        //     return;
        //   }
        // }

        return res.status(403).json({
          message: 'Require Admin Role',
        });
      }
    );
  });
};

// const auth = {
//   verifyToken,
//   isAdmin,
// };

// module.exports = auth;
