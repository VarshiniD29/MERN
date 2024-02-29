const jwt = require('jsonwebtoken');
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if ( req.method === 'OPTIONS') {
        return next ();
    }
    try{
    // Authorization : 'Bearer TOKEN'
    const token = req.headers.authorization.split(' ')[1];
    if(!token){
        throw new Error ('Authentication falied');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = {userId: decodedToken.userId};
    next();
    }catch (err) {
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
};