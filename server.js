require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const HttpError = require('./app/models/http-error');

const handlingRoutes = require('./app/routes/handling-route');
const sparesRoutes = require('./app/routes/spares-route');
const usersRoutes = require('./app/routes/user-route');

const PORT = process.env.PORT || 5000;
const initial = require('./app/helpers/initial-role');

const app = express();

// Database connection - start here
mongoose.connect(process.env.LOCAL_DATABASE_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => {
  console.log('Database is connected.');
  initial();
});
// Database connection - end here

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT,DELETE');

  next();
});

app.use('/api/handling', handlingRoutes);
app.use('/api/spares', sparesRoutes);
app.use('/api/users', usersRoutes);

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => console.log('Server is running....'));
