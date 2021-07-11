const dotenv = require('dotenv');

const HttpError = require('./app/models/http-error');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const disinfectionRoutes = require('./app/routes/disinfection-route');
const flightsRoutes = require('./app/routes/flight-route');
const handlingRoutes = require('./app/routes/handling-route');
const manpowerRoutes = require('./app/routes/manpower-route');
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

app.use(cors());

app.use('/api/disinfection', disinfectionRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/handling', handlingRoutes);
app.use('/api/manpower', manpowerRoutes);
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

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => {
  console.log('Server is running on ' + process.env.NODE_ENV + ' mode.');
});
