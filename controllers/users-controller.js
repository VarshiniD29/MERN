
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
     users = await User.find({}, '-password');
  } catch (err){
    const error = new HttpError ('Fetching Users failed, Please try again later', 500);
    return next (error);
  }
  res.json({users: users.map(user=> user.toObject({getters: true}))})
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
      return next( new HttpError('Invalid inputs passed. Please check your data.', 422));
    }

  const { name, email, password } = req.body;
  
  let existingUser
  try {
    existingUser = await User.findOne({email : email})
  } catch (err) {
    const error = new HttpError ('Signup Failed. Please try again later', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError (
      'User exists already, please try to login', 422
    );
    return next (error);
  }


  const createdUser = new User({
    name,
    email,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlrryIfsNZyhVfuiEy7KaD3m5W-OMIF242Q&usqp=CAU',
    password,
    places : []
  });

  try{
    await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Signup failed, Please try again', 500
        );
        return next (error);
    }

  res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

   
  let existingUser
  try {
    existingUser = await User.findOne({email : email})
  } catch (err) {
    const error = new HttpError ('Login Failed. Please try again later', 500);
    return next(error);
  }

  if (!existingUser|| existingUser.password !== password) {
    const error = new HttpError (
      'Invalid credentials, Could not log in', 401
    );
    return next (error);
  }

  res.json({message: 'Logged in!', 
  user: existingUser.toObject({getters: true})});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
