// Here we create the Model that will be used to store Users to the Database

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const Bank = require('./bankModel');

// We Create a schema for the User Object
// name, email, role, password, passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String, // Give the name attribute a type of String
    required: [true, 'A user must have a name'], // Here we make the Name attribute required
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your Email'],
    unique: true,
    lowerCase: true, // Stores the email in lowercase
    validate: [validator.isEmail, 'Please provide a valid email'], // Using the validator package to make sure the email is correct before storing
  },
  role: {
    type: String,
    enum: ['user', 'bank-rep', 'admin'], // Giving users a choice of 3 roles,
    // 1) A normal user only orders Cards,
    // 2) A Bank-rep is a representative for a bank and checks orders, and mark them as completed,
    // 3) Admin adds and removes Available cards also removes Users
    default: 'user',
  },
  representedIssuer: {
    // Used if the User is a bank-rep...Points to the bank that he/she represents
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
    required: [isBankRep, 'Bank Rep must be associated with a Bank or Issuer'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLenght: [8, 'Password must be more than 6 characters'], // Make sure the password attribute is linger than 8 characters
    select: false, // Prevents this attribute from being retunred when a GET request is called
  },
  passwordConfirm: {
    // Need to confirm if it it the same as the first put Password
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password; // This function makes sure that the element (el) passed into passwordConfirm attribute
        // is the same as what was passed into the password attribute
      },
      message: 'Passwords are not the same',
    },
  },
});

// FUNCTIONS

function isBankRep() {
  // This function is needed to make the 'representedIssuer' attribute to be required only if the user is a bank-rep
  if (this.role === 'bank-rep') {
    return true;
  } else {
    return false;
  }
}

// MIDDLEWARES

// Populating the representedIssuer atttribute to include the name
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'representedIssuer',
    select: 'name',
  });
  next();
});

userSchema.pre('save', async function (next) {
  // This Middleware is run whenever a new user is created/saved to the DB

  // PASSWORD ENCRYPTION
  // It Hashes the password of the user so that the actual password is not stored on the databse
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the passwordConfirm field...It is not needed anymore
  this.passwordConfirm = undefined;

  // BUG PREVENTION
  // Removing the issuerRepresented attribute if a normal user fills it in
  if (this.role !== 'bank-rep') {
    this.representedIssuer = undefined;
  }

  // ADDING REPRESENTATIVES TO THE ISSUER < BANK > OBJECT
  if (this.role === 'bank-rep') {
    // Adds a Bank-rep's ID to the reps attribute in the Bank Object
    await Bank.findByIdAndUpdate(this.representedIssuer, {
      $push: { reps: this._id },
    });
  }
  // Calling the next() function to move to the next middleware
  next();
});

// METHODS

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword // This method will compare two passwords..needed for login
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Creating the USER Model
const User = mongoose.model('User', userSchema);

module.exports = User;
