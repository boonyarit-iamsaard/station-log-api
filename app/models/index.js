const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require('./user.model');
db.role = require('./role.model');
db.spare = require('./spare.model');
db.handlingRecord = require('./handling.model')(mongoose);

db.ROLES = ['common', 'admin', 'store', 'engineer'];

module.exports = db;
