const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require('./user.model');
db.role = require('./role.model');
db.spare = require('./spare.model')(mongoose);
db.handlingRecord = require('./handling.model')(mongoose);

db.ROLES = ['user', 'admin'];

module.exports = db;
