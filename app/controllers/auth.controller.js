const config = require('../config/auth.config');
const db = require('../models');

const User = db.user;
const Role = db.role;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    // email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
      });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          user.roles = roles.map(role => role._id);

          user.save(err => {
            if (err) {
              return res.status(500).json({
                message: err.message,
              });
            }

            res.json({
              message: 'User was registered successfully',
            });
          });
        }
      );
    } else {
      Role.findOne({ name: 'user' }, (err, role) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
          });
        }

        user.roles = [role._id];

        user.save(err => {
          if (err) {
            return res.status(500).json({
              message: err.message,
            });
          }

          res.json({
            message: 'User was registered successfully',
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate('roles', '-__v')
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: 'User not found.',
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid password',
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      let authorities = [];

      user.roles.map(role => {
        authorities.push('ROLE_' + role.name.toUpperCase());
      });

      // for (let i = 0; i < user.roles.length; i++) {
      //   authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
      // }

      res.status(200).json({
        id: user._id,
        username: user.username,
        // email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};
