const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/users');

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
    } catch (e) {
        console.log(e);
        done('The user already exists');
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return done(null, false, { message: 'User not found' });
        }
        const validate = await user.isValidPassword(password);
        if (validate == null) {
            return done(null, false, { message: 'Wrong password' });
        }
        return done(null, user, { message: 'Login successfull' });
    } catch (e) {
        return done(e);
    }
}))

passport.use(new JWTStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (e) {
        done(error);
    }
}));