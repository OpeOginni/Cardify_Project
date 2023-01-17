// Contoller for all authentication process
// 1) SignUp
// 2) login
// 3) logout
// 4) Protecting Routes that only signed in users that access (using JWT tokens)
// 5) Restricitng some routes to people of higher ROLES

const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Creating JWT tokens to sign in our users
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  // Passing in the user
  const token = signToken(user._id); // Signing the user ID so that we can have access to the user object through out the system

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // To make the cookie expire 90 days from when it was created
    ),
    // secure: true,
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions); // Creating a Cookie that keeps the jwt

  // Removing the password from the cookie response
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

// 1) SIGNUP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // const url = `${req.protocol}://${req.get('host')}/me`;
  // console.log(url);
  // await new Email(newUser, url).sendWelcome(); // Sending of email

  createSendToken(newUser, 201, res); // Creating the JWT token and sending it to the user's Cookie
});

// 2) LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if the user exists && password is correct
  const user = await User.findOne({ email }).select('+password'); // Using the plus to include the password in the response

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorect email or Password', 401));
  }

  console.log(user);

  // 3) If everything is ok, send token to client
  createSendToken(user, 200, res);
});

// 3) LOGOUT
exports.logout = (req, res) => {
  // The logout function just simply changes the cookie value to something that isnt correct...thereby loggin the user out preventing them from accessing protected routes
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 + 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// 4) PROTECT
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Checking if the User has a token in the cookie
  let token;
  //   if (
  //     // Condition for testing on Postman
  //     req.headers.authorization &&
  //     req.headers.authorization.startsWith('Bearer')
  //   ) {
  //     token = req.headers.authorization.split(' ')[1];
  //   } else
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  // 2) Vefifying token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // Getting the decoded JWT

  // 3) Check if the user exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );
  }

  // GRANTING ACCESS TO THE PROTECTED ROUTE
  req.user = currentUser; // saving the current user to the req...helps in the frontend
  res.locals.user = currentUser;
  next();
});

// 5) Save loggedIn user details to req for frontend
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // 1) verify token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.status(200).json({ user: 'Not Logged In' });
      return next();
    }
    // THERE IS A LOGGED IN USER
    res.status(200).json({ user: currentUser });
    return next();
  }
  res.status(200).json({ user: 'Not Logged In' });
  next();
});

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles that is passed in is an array = ['admin', 'bank-rep]
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
