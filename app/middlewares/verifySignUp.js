const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

exports.checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (user) {
      return res.status(400).json({
        message: 'This username is already in use.',
      });
    }

    next();
  });
};

exports.checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    req.body.roles.map(role => {
      if (!ROLES.includes(role)) {
        return res.status(400).json({
          message: role.concat(' does not exist.'),
        });
      }
    });
  }

  next();
};

// const verifySignUp = {
//   checkDuplicateUsername,
//   checkRolesExisted,
// };

// module.export = verifySignUp;
