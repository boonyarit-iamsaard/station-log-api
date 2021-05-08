require('dotenv').config();

const express = require('express');
const app = express();

// const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = {
  credentials: true,
};

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', error => console.log(error));
// db.once('open', () => console.log('Database is connected.'));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//   );
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(express.json());
app.use(cors(corsOptions));

const db = require('./app/models');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Database is connected.'))
  .then(() => initial())
  .catch(err => {
    console.log('Unable to connect the database', err);
    process.exit();
  });

const Role = db.role;
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

const handlingRoutes = require('./app/routes/handling.route');
const sparesRoutes = require('./app/routes/spares.route');

const authRoutes = require('./app/routes/auth.route');
const userRoutes = require('./app/routes/user.route');

app.use('/api/auth', authRoutes, function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials: true',
    'x-access-token, Origin, Content-Type, Accept'
  );

  next();
});

app.use('/api/user', userRoutes, function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Credentials: true',
    'x-access-token, Origin, Content-Type, Accept'
  );

  next();
});

app.use('/api/handling', handlingRoutes);
app.use('/api/spares', sparesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server is running....'));
