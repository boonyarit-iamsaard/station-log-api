const dotenv = require('dotenv');

const HttpError = require('./app/models/http-error');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const handlingRoutes = require('./app/routes/handling-route');
const sparesRoutes = require('./app/routes/spares-route');
const usersRoutes = require('./app/routes/user-route');

const PORT = process.env.PORT || 5000;
const initial = require('./app/helpers/initial-role');

const app = express();

dotenv.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}.local`),
});

mongoose.connect(process.env.DATABASE_URL, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', error => console.log(error));

db.once('open', () => {
  console.log('Database is connected to ' + process.env.DATABASE_URL);
  initial();
});

app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT,DELETE');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });

app.use(cors());
app.options('*', cors());

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

app.listen(PORT, () => {
  console.log('Server is running on ' + process.env.NODE_ENV + ' mode.');
});
