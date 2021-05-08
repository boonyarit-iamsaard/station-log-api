const Role = require('../models/role-model');

const initial = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'common',
      }).save(err => {
        if (err) {
          console.log('error', err.message);
        }

        console.log("added 'common' to roles collection");
      });

      new Role({
        name: 'admin',
      }).save(err => {
        if (err) {
          console.log('error', err.message);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: 'store',
      }).save(err => {
        if (err) {
          console.log('error', err.message);
        }

        console.log("added 'store' to roles collection");
      });

      new Role({
        name: 'engineer',
      }).save(err => {
        if (err) {
          console.log('error', err.message);
        }

        console.log("added 'engineer' to roles collection");
      });
    }
  });
};

module.exports = initial;
