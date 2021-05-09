const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Role = require('../models/role-model');
const User = require('../models/user-model');
const HttpError = require('../models/http-error');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({ users: users });
};

const signup = async (req, res, next) => {
  const { firstname, lastname, username, password, roles } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  let assignedRoles;
  try {
    const requestRoles = await Role.find({
      name: { $in: roles },
    });

    assignedRoles = requestRoles.map(role => role._id);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    firstname,
    lastname,
    username,
    password: hashedPassword,
    roles: assignedRoles,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(201).json({
    message: 'Singin up successful, please login',
  });
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('User not found, plese signup.', 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid username or password.', 403);
    return next(error);
  }

  let assignedRoles;
  try {
    const roles = await Role.find({
      _id: { $in: existingUser.roles },
    });

    assignedRoles = roles.map(role => role.name);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userID: existingUser._id, username: existingUser.username },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    token: token,
    user: {
      userID: existingUser._id,
      firstname: existingUser.firstname,
      lastname: existingUser.lastname,
      roles: assignedRoles,
    },
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
